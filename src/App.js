import React from "react";
import { Button } from "react-bootstrap";
import RegionCard from "./Components/RegionCard/RegionCard";
import Info from "./Pages/InfoPage/Info";
import Region from "./Pages/RegionPage/Region";
import Footer from "./Shared/Footer/Footer";
import Navbar from "./Shared/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Info />}></Route>
        <Route path="/Regions" element={<Region />} />
      </Routes>
      <Footer></Footer>
    </>
  );
};

export default App;
