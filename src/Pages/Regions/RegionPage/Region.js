import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import forest from "../../.././Assets/Forest1.jpeg";
import { RegionService } from "../../../Services/RegionService";
import RegionCard from '../../../Components/Regions/RegionCard/RegionCard'
import "./Region.css";
import { Spinner } from "react-bootstrap";
const Region = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [Regions, setRegions] = useState([]);

  useEffect(() => {
    const getAllRegions = async () => {
      let result = await RegionService.GetRegions();
      setRegions(result);
      setIsLoading(false);
    };
    getAllRegions();
  }, []);
  console.log(Regions);

  return (
    <>
      <div className="Region--Banner">
        <img className="w-100 h-100" src={forest} alt="Banner" />
        <h1 className='title-box'>Welcome to Regions</h1>

      </div>
      <div  className='regions__bg'>      <div className="w-75 m-auto text-center  pt-3">
        <h1 className='fw-bold'>About Regions</h1>
        <p className="mt-5">
          In order to maintain good organisation of everything, National Park
          Golija has been divided in regions. Each regions has one or more
          feeding grounds. If you want to find out more details about our
          Regions you can take a look bellow.
        </p>
      </div>
      {isLoading === false ? (
        <div className="Region--box mb-5">
          {Regions.map((item) => (
            <RegionCard
              key={item.id}
              Id={item.id}
              Name={item.name}
              Area={item.area}
              Villages={item.villageName}
              Description={item.description}
            ></RegionCard>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
        <Spinner
          className="m-auto text-center"
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      )}
      </div>

    </>
    
  );
};

export default Region;
