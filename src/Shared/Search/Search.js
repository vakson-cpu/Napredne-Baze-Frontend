import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";

const Search = () => {
    const LOCAL_NAME="LocalName";
    const LATIN_NAME="LatinName";
    const [type, setType] = useState(LOCAL_NAME);
    console.log(type);

  const handleSearch = () => {};
  return (
    <div className="text-center">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Form.Control
          style={{ width: "260px" }}
          type="search"
          placeholder={"Search by"}
          value={false}
        />
        <FontAwesomeIcon
        value={true}
          style={{ cursor: "pointer" }}
          onClick={handleSearch}
          className="text-center m-auto"
          icon={faSearchengin}
        />
      </div>
      <Form.Select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="mt-2"
        aria-label="Search By"
      >
        <option>{LATIN_NAME}</option>
        <option>{LOCAL_NAME}</option>
      </Form.Select>
      <Button className='mt-2 m-auto text-center ' variant='success' >Search</Button>
    </div>
  );
};

export default Search;
