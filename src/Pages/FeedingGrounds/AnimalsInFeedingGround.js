import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import FeedingGroundsService from "../../Services/FeedingGroundsService";
import { useParams } from "react-router-dom";
import AnimalTable from "../../Components/FeedingGrounds/AnimalTable";
import AnimalsSeenChart from "./AnimalsSeenChart";
import "./AnimalsInFeedingGrounds.css";
import FormForAnimals from "../../Components/FeedingGrounds/FormForAnimals";
import AnimalService from "../../Services/AnimalService";
import { Form,Button } from "react-bootstrap";
import axios from "axios";
const AnimalsInFeedingGround = () => {
  const id = useParams().id;
  const regionId = +useParams().regionId;
  const [Animals, setAnimals] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [dataSet, setDataset] = useState([]);
  const [currentYear, setCurrentYear] = useState("2007-01-01");
  const [endDate, setEndDate] = useState("2008-12-30");
  const [filterDate, setFilterDate] = useState("")
  const [filterDate2, setFilterDate2] = useState("")
  const [Years, setYears] = useState([]);
  const [errorFlags, setErrorFlags] = useState({error:false,message:""})

  const fetchFeedingGround = async (id) => {
    let result = await AnimalService.GetAnimalsByFgId(id, "", "");
    setAnimals(result.data);

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

  const handleFilter = async()=>{
    if(filterDate===null && filterDate2===null)
      setErrorFlags({error:true,message:"Both flags mustn be empty"})
    let result = await AnimalService.GetAnimalsByFgId(id,filterDate,filterDate2);
    setAnimals(result.data);
  }

  console.log(dataSet);
  if (Loading === false)
    return (
      <div className="winter-bg text-white p-2">
        <h1 className="backround-opacity p-3 text-center ml-5 mr-5 mb-5  ">
          Here we have insights of all animals that can be found in this feeding
          ground number {id}
        </h1>
        <div className="w-75 m-auto ">
          <div className="bg-dark p-3 text-center">
            <h3 className='text-center text-white'>Filter Animals by date</h3>
            <Form className='d-flex flex-row justify-content-center flex-wrap text-center'>
              <div style={{width:"200px"}}>
                <label className="text-center">Start date: </label>
                <Form.Control type="date" value={filterDate} onChange={e=>setFilterDate(e.target.value)} placeholder="pick a date" />
              </div>
              <div style={{width:"200px",marginLeft:"30px"}}>
                <label className="text-center">End date: </label>
                <Form.Control type="date" value={filterDate2} onChange={e=>setFilterDate2(e.target.value)} placeholder="pick a date" />
              </div>
            </Form>
              {errorFlags.error===true && <span className='text-danger text-center'>{errorFlags.message}</span>}
            <Button onClick={handleFilter} className='text-center mt-3' variant='outline-light'>Filter</Button>

          </div>
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
          <div className="formDesign">
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
