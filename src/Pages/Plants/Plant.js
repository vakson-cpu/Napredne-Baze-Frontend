import React, { useEffect, useState } from "react";
import { PlantSrevice } from "../../Services/PlantService";
import { useParams } from "react-router-dom";
import PlantCard from "../../Components/Plants/PlantCardsComponents/PlantCard";
const Plant = () => {
  let id = +useParams().pageNumber;
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  const [PagginationArray, setPagginationArray] = useState([]);
  const getAll = async (something) => {
    console.log(something)
    setLoading(true);
    let result =await PlantSrevice.GetAllPlants(something);
    
    if (result.succeeded === true){ 
        setPlants(result.data.plants);
        let helpArray=[]
        for(let i=1;i<result.data.count;i++)
            helpArray.push(i);
        setPagginationArray(helpArray);
        
    }
    setLoading(false);
  };
  useEffect(() => {
    getAll(id);
  }, []);

const handlePaginate=(item)=>{

    setCurrentPage(item);
    getAll(item);
}    

console.log(plants)
if(loading===false)
  return (
    <div>
      <div className="d-flex flex-row flex-wrap">
        {plants.map((item) => (
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

    </div>
  );
  else
  return (
    <div>

    </div>
  )
};

export default Plant;
