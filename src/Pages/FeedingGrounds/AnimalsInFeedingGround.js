import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import FeedingGroundsService from "../../Services/FeedingGroundsService";
import { useParams } from "react-router-dom";
import AnimalTable from "../../Components/FeedingGrounds/AnimalTable";
import AnimalsSeenChart from "./AnimalsSeenChart";
import "./AnimalsInFeedingGrounds.css";
import FormForAnimals from "../../Components/FeedingGrounds/FormForAnimals";

const AnimalsInFeedingGround = () => {
  const id = useParams().id;
  const regionId = +useParams().regionId;
  const [Animals, setAnimals] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [dataSet, setDataset] = useState([]);
  const [currentYear, setCurrentYear] = useState("2007-01-01");
  const [endDate, setEndDate] = useState("2008-12-30");
  const [Years, setYears] = useState([]);
  const fetchFeedingGround = async (id) => {
    let result = await FeedingGroundsService.GetFeedingGroundById(id);
    console.log(result);
    setAnimals(result.data.animals);

    setLoading(false);
  };
  useEffect(() => {
    fetchFeedingGround(id);
  }, []);

  useEffect(() => {
    const helpArray = [];
    Animals.forEach((element) => {
      let obj = {
        value: element.animal.localName,
        day: element.firstSeen.slice(0, 10),
      };
      helpArray.push(obj);
    });
    setDataset(helpArray);
  }, [Animals]);

  useEffect(() => {
    if (Animals !== undefined && Animals.length > 0) {
      const array = [];
      Animals.forEach((item) => {
        let date = item.firstSeen.slice(0, 4);
        array.push(date + "-01-01");
      });
      let uniqueDates = [...new Set(array)];
      setCurrentYear(uniqueDates[0]);
      setYears(uniqueDates);
      handleEndDate(uniqueDates[0]);
      console.log(uniqueDates);
    }
  }, [Animals]);

  const handleEndDate = (date) => {
    let str = +date.slice(0, 4);
    setEndDate(`${str}-12-31`);
  };
  const handleChange = (item) => {
    setCurrentYear(item);
    handleEndDate(item);
  };
  console.log(dataSet);
  if (Loading === false)
    return (
      <div className="winter-bg text-white p-2">
        <h1 className="backround-opacity p-3 text-center ml-5 mr-5 mb-5  ">
          Here we have insights of all animals that can be found in this feeding
          ground number {id}
        </h1>
        <div className="w-75 m-auto ">
          <AnimalTable Animals={Animals} />
        </div>
        {Years.length > 0 && (
          <div
            className="d-flex flex-column mt-5"
            style={{ marginLeft: "50px" }}
          >
            <label className="ml-5">Pick a time frame: </label>
            <select className="custom-select m-4 mb-0 ">
              {Years.map((item) => (
                <option onClick={() => handleChange(item)} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}
        {dataSet.length > 0 && Years.length > 0 ? (
          <div className="mt-2 alignContent w-100 backround-opacity">
            {" "}
            <AnimalsSeenChart
              style={{ fill: "#ffffff" }}
              data={dataSet}
              startDate={currentYear}
              endDate={endDate}
            />
          </div>
        ) : (
          <></>
        )}
        <div>
          <h1 className="text-center text-white">Manage Animals in Feeding </h1>
          <div style={{ width: "600px", margin: "auto" }}>
            <FormForAnimals
              setAnimal={setAnimals}
              Animals={Animals}
              fgid={id}
              regionId={regionId}
            />
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="text-center mt-5">
        <Spinner
          className="m-auto text-center"
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
};
export default AnimalsInFeedingGround;
