import React, { useEffect } from "react";

import Info from "./Pages/InfoPage/Info";
import Region from "./Pages/Regions/RegionPage/Region";
import Footer from "./Shared/Footer/Footer";
import Navbar from "./Shared/Navbar/Navbar";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import CreatePlant from './Components/Plants/CreatePlantsForm/CreatePlant'

import { GetRegions } from "./Redux/RegionSlice";
import { useDispatch } from "react-redux";
import RegionInfoPage from "./Pages/Regions/RegionInfo/RegionInfoPage";
import FeedingGrounds from "./Pages/FeedingGrounds/FeedingGrounds";
import AnimalsInFeedingGround from "./Pages/FeedingGrounds/AnimalsInFeedingGround";

const App = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(GetRegions());
  }, [dispatch]);

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Info />}></Route>
        <Route path="Regions" element={<Region />} />
        <Route path="Regions/:regionId" element={<RegionInfoPage />} />
        <Route path='Plants/Create' element={<CreatePlant />} />
        <Route path='FeedingGrounds/:regionId' element={<FeedingGrounds/>} />
        <Route path='FeedingGrounds/:regionId/FgId/:id/Animals' element={<AnimalsInFeedingGround/>} />
      </Routes>
      <Footer></Footer>
    </>
  );
};

export default App;
