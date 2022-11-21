import React from "react";
import Card from "react-bootstrap/Card";
import regionBg from "../.././Assets/RegionCardBg.jpeg";
import './RegionCard.css'
const RegionCard = () => {
  return (
    <Card className="bg-dark text-white region-card-container">
      <Card.Img className='card-image-bg' src={regionBg} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>Region Name</Card.Title>
        <Card.Text>This is a very special region bruh</Card.Text>
        <Card.Text>Last updated 3 mins ago</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default RegionCard;
