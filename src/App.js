import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import RegionCard from "./Components/RegionCard/RegionCard";
import Info from "./Pages/InfoPage/Info";
import Region from "./Pages/RegionPage/Region";
import Footer from "./Shared/Footer/Footer";
import Navbar from "./Shared/Navbar/Navbar";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { FileUpload } from "./FileUpload";
import { PlantSrevice } from "./Services/PlantService";
import ImageUpload from "./Shared/ImageUpload/ImageUpload";
import CreatePlant from "./Components/Plants/CreatePlantsForm/CreatePlant";
import { GetRegions } from "./Redux/RegionSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const dispatch = useDispatch();
  const apiCall = async () => {
    let result = await PlantSrevice.CreatePlant(selectedFile);
    console.log(result);
  };
  function handleChange(e) {
    setSelectedFile(e.target.files[0]);
  }
  useEffect(() => {
    dispatch(GetRegions());
  }, [dispatch]);

  return (
    <>
      <Navbar></Navbar>
      {/* <input type='file'  onChange={(e)=>setSelectedFile(e.target.files[0])}   />
      <button onClick={apiCall}>VAHAA</button>
      <br>
      </br>
      <h1>
        First
      </h1>

      <Routes>
        <Route path="/" element={<Info />}></Route>
        <Route path="/Regions" element={<Region />} />
      </Routes> */}
      <CreatePlant />
      <Footer></Footer>
    </>
  );
};

export default App;
