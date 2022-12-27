import React, { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap";
import "./ListOfAnimals.css";
import { useSelector } from "react-redux";
import AnimalCard from "./AnimalCard";
import { STATUS } from "../../Enums/StatusEnum";
const ListOfAnimals = ({ Animals }) => {
  const [List, setList] = useState([]);
  const [PagginationArray, setPagginationArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const status = useSelector((state) => state.RegionSlice.status);

  useEffect(() => {
    console.log("ANIMALS ", Animals);
    const DummyArray = [];
    for (let i = 1; i <= Math.ceil(Animals.length / 8); i++) {
      DummyArray.push(i);
    }
    setPagginationArray(DummyArray);
  }, [status]);

  useEffect(() => {
    let DummyArray = [];
    let animalDummz = [];
    for (let i = 1; i <= Math.ceil(Animals.length / 8); i++) {
      DummyArray.push(i);
    }
    if (Animals.length < 8)
      for (let i = 0; i < Animals.length; i++)
        animalDummz.push(Animals[i].animal);
    else for (let i = 0; i < 8; i++) animalDummz.push(Animals[i].animal);

    setList(animalDummz);
  }, [status]);
  const handlePaginate = (item) => {
    setCurrentPage(item);
    let dummyAr = [];
    if (item === PagginationArray.length) {
      for (let i = (item - 1) * 8; i < Animals.length; i++)
        dummyAr.push(Animals[i].animal);
    } else
      for (let i = (item - 1) * 8; i < (item - 1) * 8 + 8; i++) {
        dummyAr.push(Animals[i].animal);
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
      </div>
    );
  else
    <>
      <h1>Loading...</h1>
    </>;
};

export default ListOfAnimals;
