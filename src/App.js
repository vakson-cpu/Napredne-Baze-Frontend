import React, { useEffect } from "react";

import Info from "./Pages/InfoPage/Info";
import Region from "./Pages/Regions/RegionPage/Region";
import Footer from "./Shared/Footer/Footer";
import Navbar from "./Shared/Navbar/Navbar";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import CreatePlant from "./Components/Plants/CreatePlantsForm/CreatePlant";
import { Roles } from "./Enums/RoleEnum";

import { GetRegions } from "./Redux/RegionSlice";
import { useDispatch, useSelector } from "react-redux";
import RegionInfoPage from "./Pages/Regions/RegionInfo/RegionInfoPage";
import FeedingGrounds from "./Pages/FeedingGrounds/FeedingGrounds";
import AnimalsInFeedingGround from "./Pages/FeedingGrounds/AnimalsInFeedingGround";
import CreateAnimalModal from "./Components/Animal/CreateAnimalModal";
import { signIn } from "./Redux/AuthSlice";
import NotFound from "./Pages/NotFound";
import Plant from "./Pages/Plants/Plant";
import Animal from "./Pages/Animals/Animal";
import Users from "./Pages/Admin/Users";
import ManageWorkers from "./Pages/Admin/ManageWorkers";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetRegions());
  }, [dispatch]);
  useEffect(() => {
    if (localStorage.length > 0) {
      let role = localStorage.getItem("Role");
      dispatch(signIn(role));
    }
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Info />}></Route>
        <Route path="Regions" element={<Region />} />{" "}
        <Route path="Regions/:regionId" element={<RegionInfoPage />} />
        <Route
          path="Plants/Create"
          element={
            <ProtectedRoute permission={Roles.Administrator}>
              <CreatePlant />
            </ProtectedRoute>
          }
        />
        <Route
          path="FeedingGrounds/:regionId/:pageNumber"
          element={<FeedingGrounds />}
        />
        <Route
          path="FeedingGrounds/:regionId/FgId/:id/Animals"
          element={<AnimalsInFeedingGround />}
        />
        <Route path="Plants/Get/:pageNumber" element={<Plant />} />
        <Route path="Animals/GetAll/:pageNumber" element={<Animal />} />
        <Route
          path="Users/GetAllUsers"
          element={
            <ProtectedRoute permission={Roles.Administrator}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="Users/ManageFeedingGrounds"
          element={
            <ProtectedRoute permission={Roles.Administrator}>
              <ManageWorkers />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
};

export default App;
