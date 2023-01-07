import React, { useEffect, useState, useSyncExternalStore } from "react";
import { PlantSrevice } from "../../Services/PlantService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PlantCard from "../../Components/Plants/PlantCardsComponents/PlantCard";
import { Spinner } from "react-bootstrap";
import Search from "../../Shared/Search/Search";
import {Button} from "react-bootstrap"
import "./Plant.css";

const Plant = () => {
  let id = +useParams().pageNumber;
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [sortValue, setsortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(id ?? 1);
  const [PagginationArray, setPagginationArray] = useState([]);
  const [Rarity, setRarity] = useState(0);

  const getAll = async (something) => {
    setCurrentPage(something);
    setLoading(true);
    let result = await PlantSrevice.GetAllPlants(something,sortBy,sortValue,Rarity);
    
    console.log("Primljeno za paginaciju",result);
    if (result.succeeded === true) {
      setPlants(result.data.plants);
      let helpArray = [];
      for (let i = 0; i < Math.ceil(result.data.count / 8); i++)
        helpArray.push(i + 1);
      setPagginationArray(helpArray);
    }
    setLoading(false);
  };
  useEffect(() => {
    getAll(id);
  }, [id]);

  // const handlePaginate = (item) => {
  //   setCurrentPage(item);
  //   getAll(item,sortBy,sortValue,Rarity);
  // };

  const handleSearch=async()=>{
    setLoading(true)
    let result = await PlantSrevice.GetAllPlants("1",sortBy,sortValue,Rarity);
    setPlants(result.data.plants);
    setLoading(false)
  }
  if (loading === false)
    return (
      <div className="parentWrapper">
        <h1 className="mt-5 mb-2 text-success text-center fw-bold ">
          All plants located on Golija
        </h1>
        <div className="m-auto mt-5 text-center" style={{ width: "300px" }}>
          {" "}
          <Search  setSort={setSortBy} setSortValue={setsortValue} sortBy={sortBy} sortValue={sortValue} IsPlants={true} rarityValue={Rarity} setRarityValue={setRarity} />
          <Button onClick={handleSearch} className='mt-2 m-auto text-center ' variant='success' >Search</Button>

        </div>
        {plants.length > 0 ? (
          <div className="d-flex flex-row flex-wrap justify-content-center mt-5">
            {plants.map((item) => (
              <PlantCard
                LocalName={item.localName}
                title={item.latinName}
                img={item.image}
                Rarity={item.protectionId}
              />
            ))}
          </div>
        ) : (
          <div className="mt-5 mb-5">
            <h2 className="text-center text-success">
              There is no plants in this region
            </h2>
          </div>
        )}
        <div
          className="childWrapper d-flex d-row flex-wrap mt-2 mb-5"
          style={{ marginLeft: "150px" }}
        >
          {PagginationArray.map((item) => {
            return (
              <Link className="pagi-Link" to={`/Plants/Get/${item}`}>
                <span
                  className={
                    currentPage === item ? "pagi-item active" : "pagi-item"
                  }
                >
                  {item}
                </span>
              </Link>
            );
          })}
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

export default Plant;
