import React from 'react'
import { Card } from 'react-bootstrap'
const AnimalCard = ({title,LocalName,img,Villages}) => {
  
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
      <Card.Text>Villages:{Villages} </Card.Text>
    </Card.Body>
  </Card>
  )
}

export default AnimalCard