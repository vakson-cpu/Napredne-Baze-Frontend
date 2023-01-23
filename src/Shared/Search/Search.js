import React from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { Protections } from "../../Enums/ProtectionsEnum";

const Search = ({
  setSort,
  setSortValue,
  sortBy,
  sortValue,
  IsPlants,
  rarityValue,
  setRarityValue,
}) => {
  const LOCAL_NAME = "LocalName";
  const LATIN_NAME = "LatinName";
  const Rarity = [
    {
      Rarity: "All",
      value: 0,
    },
    {
      Rarity: "Common",
      value: Protections.COMMON,
    },
    {
      Rarity: "Rare",
      value: Protections.RARE,
    },
    {
      Rarity: "Endangered",
      value: Protections.ENDANGERED,
    },
  ];
  console.log("rarity",rarityValue);
  return (
    <div className="text-center">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Form.Control
          style={{ width: "260px" }}
          type="text"
          placeholder={"Search"}
          value={sortValue}
          onChange={(e) => setSortValue(e.target.value)}
        />
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          className="text-center m-auto"
          icon={faSearchengin}
        />
      </div>
      <Form.Select
        value={sortBy}
        onChange={(e) => setSort(e.target.value)}
        className="mt-2"
        aria-label="Search By"
      >
        <option>{LATIN_NAME}</option>
        <option>{LOCAL_NAME}</option>
      </Form.Select>
      { IsPlants &&
      <Form.Select
        value={rarityValue}
        onChange={(e) => setRarityValue(e.target.value)}
        className="mt-2"
        aria-label="Search By"
      >
        {Rarity.map((item,index)=><option key={index} value={item.value}>{item.Rarity}</option>)}
      </Form.Select>
}
    </div>
  );
};

export default Search;
