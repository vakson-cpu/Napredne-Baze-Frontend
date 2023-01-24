import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "./FormForAnimal.css";
import AnimalService from "../../Services/AnimalService";
import FeedingGroundsService from "../../Services/FeedingGroundsService";
function FormForAnimals({ Animals, regionId, fgid, setAnimal }) {
  const [LatinName, setLatinName] = useState("");
  const [date, setDate] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [allAnimals, setAllAnimals] = useState([]);
  const [error, setErrorFlags] = useState({ flag: false, text: "" });
  const onTextChange = (tekst) => {
    let matches = [];
    setLatinName(tekst);

    if (tekst.length > 0) {
      matches = allAnimals.filter((element) => {
        const regex = new RegExp(`${tekst}`, "gi");
        return element.latinName.match(regex);
      });
    }
    if (matches.length > 8) matches.splice(0, 7);
    setSuggestions(matches);
  };

  useEffect(() => {
    const fetchAnimals = async () => {
      let result = await AnimalService.GetAnimalsByRegionId(regionId);
      console.log(result);
      if (result.succeeded === true) {
        setAllAnimals(result.data);
      }
    };
    fetchAnimals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSuggestionChange = (val) => {
    setLatinName(val);
    setSuggestions([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (LatinName === "") {
      setErrorFlags({
        flag: true,
        text: "LatinName must be filled",
      });
    }
    if (date == null || date === "") {
      console.log(date);
      setErrorFlags({
        flag: true,
        text: "Date aint valid",
      });
      return 1
    }
    if (date > Date.now()) {
      setErrorFlags({
        flag: true,
        text: "Date cant be bigger than current date.",
      });

      return 1;
    } else {
      let ifExists = Animals.filter(
        (item) => item.animal.latinName === LatinName
      );
      if (ifExists.length > 0) {
        setErrorFlags({
          flag: true,
          text: "Animal is already in feeding ground.",
        });

        return;
      }
      let animalToAdd = allAnimals.filter(
        (item) => item.latinName === LatinName
      );
      console.log(animalToAdd);
      if (animalToAdd.length === 0) {
        setErrorFlags({
          flag: true,
          text: "The Animal doesnt exist",
        });
      }
       await FeedingGroundsService.AddAnimalToFeedingGrounds(
        animalToAdd[0].id,
        fgid,
        date
      );
      let newAnimals = await FeedingGroundsService.GetFeedingGroundById(fgid);
      console.log(newAnimals);
      setAnimal(newAnimals.data.animals);
    }
  };
  return (
    <Form className="bg-black text-white p-4 parentDiv mb-5 ">
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
        {error.flag && <p className="text-danger mt-2 ">{error.text}</p>}
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
