import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserService } from "../../Services/UserService";
import { useSelector,useDispatch } from "react-redux";
import {LogInUser} from '../../Redux/AuthSlice'
import jwtDecode from "jwt-decode";

import "./LoginModal.css";
export default function LoginModal({ handleShow, show }) {
  const [switchSign, setSwitchSign] = useState(true); //Initially set on true for log-in
  const dispatch= useDispatch();
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [Email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (switchSign === false){
      await UserService.Register({ Name, LastName, Email, Password });
      setSwitchSign(true);
    }
    else {
      
      // let response=await UserService.LogIn({ Email, Password });
      let response=await dispatch(LogInUser({Email, Password }))
      console.log(response.payload);
      if(response.payload.succeeded){
      let user=jwtDecode(response.payload.data);
      console.log(user)
      localStorage.setItem("token",response.data)
      localStorage.setItem("Name",user.Name);
      localStorage.setItem("LastName",user.LastName);
      localStorage.setItem("Role",user.Role);
      localStorage.setItem("Id",user.id);
      handleShow(false);
      }
    
    }
  };

  return (
    <Modal show={show} onHide={() => handleShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title className="color">Welcome!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="login-form">
          <h3 className="mb-2">{switchSign ? "Sign-in" : "Sign-Up"}</h3>
          <input
            className="form--input"
            type="text"
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {switchSign === false && (
            <input
              className="form--input"
              type="text"
              placeholder="FirstName"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {switchSign === false && (
            <input
              className="form--input"
              type="text"
              placeholder="LastName"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          )}
          <input
            className="form--input"
            type="password"
            placeholder="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {switchSign === false && (
            <input
              className="form--input"
              type="password"
              placeholder="re-enter password"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
            />
          )}
          <p className="text-button" onClick={() => setSwitchSign(!switchSign)}>
            {switchSign === true
              ? "Dont have an account? Please sign up!"
              : "Already have an account. Please Sign in!?"}
          </p>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={() => handleShow(false)}>
          Close
        </Button>
        <Button variant="outline-success" onClick={() => handleSubmit()}>
          {switchSign ? "Sign in" : "Sign Up"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
