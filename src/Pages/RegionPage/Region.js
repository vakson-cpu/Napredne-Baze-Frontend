import React from "react";
import Card from "react-bootstrap/Card";
import forest from "../.././Assets/Forest1.jpeg";
import './Region.css'
const Region = () => {
  return (
    <>
    <div className="Region--Banner">
      <img className="w-100 h-100" src={forest} alt="Banner" />
    </div>
    <div className='w-75 m-auto text-center mt-5' >
      <h1>Welcome to Regions</h1>
      <p className="mt-5">
        In order to maintain good organisation of everything, National Park
        Golija has been divided in regions. Each regions has one or more feeding
        grounds. If you want to find out more details about our Regions you can
        take a look bellow.
      </p>
      </div>
      <div className="Region-box">
      
      </div>



    </>
  );
};

export default Region;
