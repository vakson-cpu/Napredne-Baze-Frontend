import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "./FormForAnimal.css";
import AnimalService from "../../Services/AnimalService";
import FeedingGroundsService from "../../Services/FeedingGroundsService";
function FormForAnimals({ Animals, regionId,fgid }) {
  const [LatinName, setLatinName] = useState("");
  const [date, setDate] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [allAnimals, setAllAnimals] = useState([]);
  const [flag, setFlag] = useState(false);
  const onTextChange = (tekst) => {
    let matches = [];
    setLatinName(tekst);

    if (tekst.length > 0) {
      matches = allAnimals.filter((element) => {
        const regex = new RegExp(`${tekst}`, "gi");
        return element.latinName.match(regex);
      });
    }
    console.log("matches: ", matches);
    if (matches.length > 8) matches.splice(0, 7);
    setSuggestions(matches);
  };

  useEffect(() => {
    const fetchAnimals = async () => {
      let result = await AnimalService.GetAnimalsByRegionId(regionId);
      console.log(result);
      if (result.succeeded === true) {
        setFlag(false);
        console.log("Rezultat cekanja", result);
        setAllAnimals(result.data);
      } else setFlag(true);
    };
    fetchAnimals();
  }, []);

  const onSuggestionChange = (val) => {
    setLatinName(val);
    setSuggestions([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (date > Date.now()) {
      alert("Greska");
      return 1;
    } else {
      let ifExists = Animals.filter(
        (item) => item.animal.latinName === LatinName
      );
      if (ifExists.length > 0) {
        alert("Animal is already in feedingGround");
        return;
      }
      let animalToAdd = allAnimals.filter(
        (item) => item.latinName === LatinName
      );
      console.log(animalToAdd)
      let result = await FeedingGroundsService.AddAnimalToFeedingGrounds(
        animalToAdd[0].id,
        fgid,
        date
      );
      console.log("ovo je ", result);
    }
  };
  return (
    <Form className="bg-black text-white p-4 parentDiv ">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Latin Name</Form.Label>
        <Form.Control
          value={LatinName}
          onChange={(e) => onTextChange(e.target.value)}
          type="text"
        />
        {suggestions &&
          suggestions.map((suggestions, i) => (
            <div
              key={i}
              onClick={(e) => onSuggestionChange(suggestions.latinName)}
              className="w-25 suggestions text-black "
            >
              {suggestions.latinName}
            </div>
          ))}
      </Form.Group>
      <Form.Group className="mb-3 child" controlId="formBasicPassword">
        <Form.Label>First seen</Form.Label>
        <Form.Control
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ width: "200px" }}
          type="date"
          placeholder="FirstSeens"
        />
      </Form.Group>
      <div className="text-center child2">
        <Button
          onClick={(e) => onSubmit(e)}
          variant="outline-warning"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default FormForAnimals;
