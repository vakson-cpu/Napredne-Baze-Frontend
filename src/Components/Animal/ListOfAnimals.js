import React, { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap";
import "./ListOfAnimals.css";
import { useSelector } from "react-redux";
import AnimalCard from "./AnimalCard";
import { STATUS } from "../../Enums/StatusEnum";
const ListOfAnimals = ({ regionId }) => {
  const [List, setList] = useState([]);
  const [PagginationArray, setPagginationArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const status = useSelector((state) => state.RegionSlice.status);
  const regions = useSelector((state) => state.RegionSlice.regions);
  useEffect(() => {
    const region = regions.filter((item) => item.id === regionId);
    let animals = region[0].animals;
    const DummyArray = [];
    for (let i = 1; i <= Math.ceil(animals.length / 8); i++) {
      DummyArray.push(i);
    }
    setPagginationArray(DummyArray);
  }, [status]);

  useEffect(() => {
    const region = regions.filter((item) => item.id === regionId);
    let animals = region[0].animals;
    let DummyArray = [];
    let animalDummz = [];
    for (let i = 1; i <= Math.ceil(animals.length / 8); i++) {
      DummyArray.push(i);
    }
    if (animals.length < 8)
      for (let i = 0; i < animals.length; i++)
        animalDummz.push(animals[i].animal);
    else for (let i = 0; i < 8; i++) animalDummz.push(animals[i].animal);

    setList(animalDummz);
  }, [status]);

  const handlePaginate = (item) => {
    const region = regions.filter((item) => item.id === regionId);
    let animals = region[0].animals;
    setCurrentPage(item);
    let dummyAr = [];
    if (item === PagginationArray.length) {
      for (let i = (item - 1) * 8; i < animals.length; i++)
        dummyAr.push(animals[i].animal);
    } else
      for (let i = (item - 1) * 8; i < (item - 1) * 8 + 8; i++) {
        dummyAr.push(animals[i].animal);
      }
    setList(dummyAr);
    console.log("tu displej", dummyAr);
  };
  if (status === STATUS.SUCCEDED)
    return (
      <div className="w-100">
        <div className="d-flex flex-row flex-wrap">
          {List.map((item) => (
            <AnimalCard
              key={item.id}
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
                key={item}
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
      </div>
    );
  else
    <>
      <h1>Loading...</h1>
    </>;
};

export default ListOfAnimals;
