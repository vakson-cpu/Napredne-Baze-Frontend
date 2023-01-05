import React, { useState, useEffect } from "react";
import AnimalCard from "../../Components/Animal/AnimalCard";
import AnimalService from "../../Services/AnimalService";
import { useParams, Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
const Animal = () => {
  const [List, setList] = useState([]);
  const [PagginationArray, setPagginationArray] = useState([]);
  const page = useParams().pageNumber;
  const [currentPage, setCurrentPage] = useState(page ?? 1);
  const [Loading, setLoading] = useState(true);

  const fetchAnimals = async (numberOfPage) => {
    setCurrentPage(numberOfPage);
    setLoading(true);
    let result = await AnimalService.GetAllAnimals(numberOfPage);
    console.log(result);
    if (result.succeeded === true) {
      setList(result.data.animals);
      let helpArray = [];
      for (let i = 0; i < Math.ceil(result.data.count / 8); i++)
        helpArray.push(i + 1);
      setPagginationArray(helpArray);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals(page);
  }, [page]);
  if (Loading === false)
    return (
      <div>
        <h3 className="text-success text-center mt-5 mb-2 fw-bold">
          All Animals Located on Golija
        </h3>
        
        <div className="d-flex flex-row flex-wrap justify-content-center mt-5">
          {List.map((item) => (
            <AnimalCard
              LocalName={item.localName}
              title={item.latinName}
              img={item.image}
              Rarity={item.protectionId}
              Villages={item.villageName}
            />
          ))}
        </div>
        <div
          className="childWrapper d-flex d-row flex-wrap mt-2 mb-5"
          style={{ marginLeft: "150px" }}
        >
          {PagginationArray.map((item) => {
            return (
              <Link className="pagi-Link" to={`/Animals/GetAll/${item}`}>
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

export default Animal;
