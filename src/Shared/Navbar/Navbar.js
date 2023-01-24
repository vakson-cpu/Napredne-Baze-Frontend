import React, { useState } from "react";
import { Link } from "react-router-dom";
import GolijaLogo from "../../Assets/GolijaLogo.jpg";
import Hamburger from "hamburger-react";
import LoginModal from "../Modals/LoginModal";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import { resetValues } from "../../Redux/WorkerSlice";
const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const IsLogged = useSelector((state) => state.AuthSlice.IsLoggedIn);
  const navigate=useNavigate();
  const role = useSelector((state) => state.AuthSlice.Role);
  const dispatch = useDispatch();
  const handleLogin = () => {
    if (!IsLogged) setShowModal(!showModal);
    else {
      dispatch(signOut());
      dispatch(resetValues());
      navigate("/");
    }
  };
  console.log(role);
  return (
    <>
      <LoginModal handleShow={setShowModal} show={showModal}></LoginModal>
      <div className="Navbar-box ">
        <div className="Navbar-Logo-box">
          <img src={GolijaLogo} alt="navigation" />
        </div>
        <div className="Navbar-Links-Column">
          <div className="Navbar-Links">
            <Link to={"/"}>
              <p>Home</p>
            </Link>
            <Link to={"Regions"}>
              <p>Regions</p>
            </Link>
            <Link to={"Animals/GetAll/1"}>
              <p>Animals</p>
            </Link>
            <Link to={"Plants/Get/1"}>
              <p>Plants</p>
            </Link>
            {role === "Administrator" && (
              <Link to={"Users/GetAllUsers"}>
                <p>Users</p>
              </Link>
            )}
            {role === "Administrator" && (
              <Link to={"Users/ManageFeedingGrounds"}>
                <p>Manage</p>
              </Link>
            )}
 
            <button className="custom-button" onClick={handleLogin}>
              {IsLogged ? "Log-Out" : "Log-in"}
            </button>
          </div>
          <div className="Navbar-ham">
            <Hamburger onToggle={() => setOpenNavbar(!openNavbar)}></Hamburger>
          </div>
        </div>
      </div>
      {openNavbar && (
        <div className="Navbar-Links2">
          <Link to={"/"}>
            <p>Home</p>
          </Link>
          <Link to={"Regions"}>
            <p>Regions</p>
          </Link>
          <Link to={"Animals/GetAll/1"}>
            <p>Animals</p>
          </Link>
          <Link to={"Plants/Get/1"}>
            <p>Plants</p>
          </Link>
          {role === "Administrator" && (
            <Link to={"Users/GetAllUsers"}>
              <p>Users</p>
            </Link>
          )}
          <button className="custom-button" onClick={handleLogin}>
            {IsLogged ? "Log-Out" : "Log-in"}
          </button>
        </div>
      )}
    </>
  );
};
export default Navbar;
