import React, { useState } from "react";
import { Link } from "react-router-dom";
import GolijaLogo from "../../Assets/GolijaLogo.jpg";
import Hamburger from "hamburger-react";
import LoginModal from "../Modals/LoginModal";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../Redux/AuthSlice";
const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const IsLogged = useSelector((state) => state.AuthSlice.IsLoggedIn);
  const dispatch = useDispatch();
  const handleLogin = () => {
    if (!IsLogged) setShowModal(!showModal);
    else {
      dispatch(signOut());
    }
  };
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
            <Link to={"Nekilink"}>
              <p>Animals</p>
            </Link>
            <Link  to={"Plants/Get/1"}>
              <p>Plants</p>
            </Link>
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
          <Link to={"Nekilink"}>
            <p>Home</p>
          </Link>
          <Link to={"Nekilink"}>
            <p>Regions</p>
          </Link>
          <Link to={"Nekilink"}>
            <p>Animals</p>
          </Link>
          <Link to={"Nekilink"}>
            <p>Plants</p>
          </Link>
          <Link to={"Nekilink"}>
            <p>Log-In</p>
          </Link>
        </div>
      )}
    </>
  );
};
export default Navbar;
