import React, { useEffect, useState } from "react";
import { PlantSrevice } from "../../Services/PlantService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PlantCard from "../../Components/Plants/PlantCardsComponents/PlantCard";
import { Spinner } from "react-bootstrap";
import './Plant.css'

const Plant = () => {
  let id = +useParams().pageNumber;
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(id ?? 1);
  const [PagginationArray, setPagginationArray] = useState([]);

  const getAll = async (something) => {
    console.log(something);
    setCurrentPage(something)
    setLoading(true);
    let result = await PlantSrevice.GetAllPlants(something);
    console.log(result)
    if (result.succeeded === true) {
      setPlants(result.data.plants);
      let helpArray = [];
      for (let i = 0; i < Math.ceil(result.data.count/8); i++) helpArray.push(i+1);
      setPagginationArray(helpArray);
    }
    setLoading(false);
  };
  useEffect(() => {
    getAll(id);
  }, [id]);

  const handlePaginate = (item) => {
    setCurrentPage(item);
    getAll(item);
  };

  console.log(plants);
  if (loading === false)
    return (
      <div className="parentWrapper">
        <h1 className='mt-5 mb-2 text-success text-center '>All plants located on Golija</h1>
        { plants.length>0 ?(
        <div className="d-flex flex-row flex-wrap justify-content-center mt-5">
          {plants.map((item) => (
            <PlantCard
              LocalName={item.localName}
              title={item.latinName}
              img={item.image}
              Rarity={item.protectionId}
            />
          ))}
        </div>):<div className="mt-5 mb-5"><h2 className="text-center text-success">There is no plants in this region</h2></div>
          }
        <div className="childWrapper d-flex d-row flex-wrap mt-2 mb-5" style={{ marginLeft: "150px" }}>
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
  else return (
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
