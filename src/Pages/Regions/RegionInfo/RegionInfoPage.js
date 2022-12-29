import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Protections } from "../../../Enums/ProtectionsEnum";
import { STATUS } from "../../../Enums/StatusEnum";
import { NivePieChart } from "../../../Shared/Charts/NivePieChart";
import { Link, useParams } from "react-router-dom";
import "./RegionInfoPage.css";
import { Button, Spinner } from "react-bootstrap";
import PlantCard from "../../../Components/Plants/PlantCardsComponents/PlantCard";
import ListOfAnimals from "../../../Components/Animal/ListOfAnimals";

const RegionInfoPage = () => {
  const Id = +useParams().regionId;
  console.log(Id);
  const [Region, setRegion] = useState({});
  const [Plants, setPlants] = useState([]);
  const Regions = useSelector((state) => state.RegionSlice.regions);
  const status = useSelector((state) => state.RegionSlice.status);
  const [currentPage, setCurrentPage] = useState(1);
  const [PagginationArray, setPagginationArray] = useState([]);
  const [toDisplayPlants, setToDisplayPlants] = useState([]);
  useEffect(() => {
    if (STATUS.SUCCEDED === status) {
      let region = Regions.filter((region) => region.id === Id);
      setRegion(region[0]);
      let count3 = 0;
      let count2 = 0;
      let count1 = 0;
      region[0].plants.map((item) => {
        if (item.plant.protectionId === 1) count1++;
        if (item.plant.protectionId === 2) count2++;
        if (item.plant.protectionId === 3) count3++;
        return;
      });
      let dataset = [
        {
          id: "Common",
          value: count1,
        },
        {
          id: "Rare",
          value: count2,
        },
        {
          id: "Endangered",
          value: count3,
        },
      ];
      setPlants(dataset);
      let DummyArray = [];
      let plantDummz = [];
      for (let i = 1; i <= Math.ceil(region[0].plants.length / 8); i++) {
        DummyArray.push(i);
      }
      if (region[0].plants.length < 8)
        for (let i = 0; i < region[0].plants.length; i++)
          plantDummz.push(region[0].plants[i].plant);
      else
        for (let i = 0; i < 8; i++) plantDummz.push(region[0].plants[i].plant);

      setToDisplayPlants(plantDummz);

      setPagginationArray(DummyArray);
    }
  }, [status]);

  console.log(Regions);
  const handlePaginate = (item) => {
    setCurrentPage(item);
    let dummyAr = [];
    if (item === PagginationArray.length) {
      for (let i = (item - 1) * 8; i < Region.plants.length; i++)
        dummyAr.push(Region.plants[i].plant);
    } else
      for (let i = (item - 1) * 8; i < (item - 1) * 8 + 8; i++) {
        dummyAr.push(Region.plants[i].plant);
      }
    setToDisplayPlants(dummyAr);
    console.log("tu displej", dummyAr);
  };
  if (STATUS.SUCCEDED === status)
    return (
      <div className="backgroundImage--Nature pt-5">
        <div className="overlay-box">
          <h1 className="text-center fw-bold text-white">{Region.name}</h1>
          <h2 className="text-white ">About:</h2>
          <p className=" special-paragraph text-white fst-italic">
            {Region.description}
          </p>

          <h2 className="text-white">Area:</h2>
          <p className="text-white fst-italic">{Region.area}KM2</p>

          <h2 className="text-white ">Villages:</h2>
          <p className="text-white fst-italic">{Region.villageName}</p>
          <h2 className="text-center text-white fw-bold">
            Statistical representation of Plants
          </h2>
          <div className="widthPanel">
            <NivePieChart className=" w-100 h-100" data={Plants} />
            {/* <NivePieChart className="w-100 h-100" data={Plants} /> */}
          </div>
          <div>
            <h2 className="text-white text-center mt-5 mb-5 ">
              Plants in this region:{" "}
            </h2>
            
            <Link to="/Plants/Create" className="alignButton">
              <Button variant="outline-warning">Add Plant</Button>
            </Link>
            <div className="d-flex flex-row flex-wrap">
              {toDisplayPlants.map((item) => (
                <PlantCard
                  LocalName={item.localName}
                  title={item.latinName}
                  img={item.image}
                  Rarity={item.protectionId}
                />
              ))}
            </div>

            <div className="d-flex d-row flex-wrap" style={{ margin: "23px" }}>
              {PagginationArray.map((item) => {
                return (
                  <span
                    onClick={() => handlePaginate(item)}
                    className={
                      currentPage === item ? "pagi-item active" : "pagi-item"
                    }
                  >
                    {item}
                  </span>
                );
              })}
            </div>
            {Region.animals !== undefined && (
              <ListOfAnimals Animals={Region.animals} />
            )}
          </div>
          <p className="text-center text-white ">
            Region is divivded in special feeding grounds where we take care of our animals.
            If you want to take a look into our feeding grounds you can follow the link.
          </p>
          <div className='d-flex justify-content-center'>
            <Link to ={`/FeedingGrounds/${Id}/1`}><Button   variant='danger'>Feeding Grounds...</Button></Link>
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

export default RegionInfoPage;
