import React,{useEffect,useState} from 'react'
import { Card,Badge } from 'react-bootstrap'
import bgImage from '../../Assets/GoogleMapaGolija.jpg'
import { Link } from 'react-router-dom'
const FeedingGroundCard = ({Id,startDate,endDate,fgnumber,animals}) => {

    const [isActive, setIsActive] = useState({label:"Not Active",color:"danger"})
    function dateFormat(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    }
    useEffect(() => {
        let date =dateFormat(new Date());
        console.log("Tr",date)
        if(date>startDate && date<endDate)
            setIsActive({label:"Active",color:"success"});
    }, [])
    
  return (
    <Card className='mt-3' style={{ width: "25rem",marginLeft:"30px" }}>
    <Card.Img
      variant="top"
      style={{width:"100%", height:"200px"}}
      src={bgImage}
    />
    <Card.Body>
      <Card.Title>Id:{fgnumber}</Card.Title>
      <Card.Text>Active in: {startDate}--{endDate}</Card.Text>
      <Card.Text>Number of animals: <span className='text-danger'>{animals.length}</span>, <Link to={`FgId/${Id}/Animals`}>See the list</Link></Card.Text>
      <Badge bg={isActive.color}>{isActive.label}</Badge>
    </Card.Body>
  </Card>
  )
}

export default FeedingGroundCard