import React from "react";
import Card from "react-bootstrap/Card";
import regionBg from "../../.././Assets/RegionCardBg.jpeg";
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './RegionCard.css'
const RegionCard = ({Name,Area,Villages,Description,Id}) => {

  
  return (
    <Card className="mt-5 bg-dark text-white region-card-container">
      <Card.Img className='card-image-bg' src={regionBg} alt="Card image" />
      <Card.ImgOverlay className='Dark-bg'>
        <Card.Title>Name of the Region:{<span className='fw-bold fst-italic'>{Name}</span>}</Card.Title>
        <Card.Text>Area: {<span className='fw-bold fst-italic'>{Area}</span>} km2</Card.Text>
        <Card.Text>Villages within:{<span className='fw-bold fst-italic'> {Villages}</span>}</Card.Text>
        <Card.Text>About:{<span className='fw-bold fst-italic'> {Description.slice(0,67)} ...</span>}</Card.Text>

        <Link to={`/Regions/${Id}`} ><Button className='text-center '  variant='outline-danger'>More Info</Button></Link>
      </Card.ImgOverlay>
    </Card>
  );
};

export default RegionCard;
