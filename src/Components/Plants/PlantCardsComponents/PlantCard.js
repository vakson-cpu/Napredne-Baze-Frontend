import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Protections } from "../../../Enums/ProtectionsEnum";
const PlantCard = ({ title, LocalName, Rarity, img }) => {
  var obj = { rarity: "", label: "" };
  switch (Rarity) {
    case Protections.COMMON:
      obj.label = "Common";
      obj.rarity = "success";
      break;
    case Protections.RARE:
      obj.label = "Rare";
      obj.rarity = "warning";
      break;
    case Protections.ENDANGERED:
      obj.label = "Endangered";
      obj.rarity = "danger";
      break;

    default:
      break;
  }

  return (
    <Card className='mt-3' style={{ width: "18rem",marginLeft:"30px" }}>
      <Card.Img
        variant="top"
        style={{width:"100%", height:"200px"}}
        src={`http://vakson-001-site1.atempurl.com/api/Plants/image/${img}`}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Local Name: {LocalName}</Card.Text>
        <Card.Text>Rarity: </Card.Text>
        <Badge bg={obj.rarity}>{obj.label}</Badge>
      </Card.Body>
    </Card>
  );
};

export default PlantCard;
