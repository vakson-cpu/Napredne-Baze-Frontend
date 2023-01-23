import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { UserService } from "../../Services/UserService";
import { useDispatch } from "react-redux";
import {GetWorkersInfo} from '../.././Redux/WorkerSlice'
import { LogInUser, signIn } from "../../Redux/AuthSlice";
import jwtDecode from "jwt-decode";

import "./LoginModal.css";
export default function LoginModal({ handleShow, show }) {
  const [switchSign, setSwitchSign] = useState(true); //Initially set on true for log-in
  const dispatch = useDispatch();
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [Email, setEmail] = useState("");

  const [RequestResults, setRequestResults] = useState({
    completed: false,
    succeeded: false,
    message: "",
  });

  const handleSubmit = async () => {
    if (switchSign === false) {
      try {
        let response = await UserService.Register({
          Name,
          LastName,
          Email,
          Password,
        });
        console.log(response);
        if (response.succeeded) {
          setRequestResults({
            completed: true,
            succeeded: true,
            message: "Succesfully completed action",
          });
        }
        setSwitchSign(true);
      } catch (err) {
        setRequestResults({
          completed: true,
          succeeded: false,
          message:
            "Something went wrong! Make sure to insert fields correctly," +
            "Name and lastname must start with capital letter and be at least 5 characters long, " +
            "Password must contain capital letter and at least 8 chars with letters and numbers",
        });
      }
    } else {
      let response = await dispatch(LogInUser({ Email, Password }));
      if (response.payload.succeeded) {
        console.log("Why am i here")
        let user = jwtDecode(response.payload.data);
        console.log(user);
        let role =
          user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        localStorage.setItem("token", response.payload.data);
        localStorage.setItem("Name", user.Name);
        localStorage.setItem("LastName", user.LastName);
        localStorage.setItem("Role", role);
        localStorage.setItem("Id", user.Id);
        dispatch(signIn(role));
        if(role==="Worker"){
          dispatch(GetWorkersInfo(user.Id))
        }
        handleShow(false);
        setRequestResults({
          completed: true,
          succeeded: true,
          message: "Succesfully completed action",
        });
      } else {
        setRequestResults({
          completed: true,
          succeeded: false,
          message: "Action failed",
        });
      }
    }
  };

  if (RequestResults.completed === false && show)
    return (
      <Modal show={show} onHide={() => handleShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="color">Welcome!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="login-form">
            <h3 className="mb-2">{switchSign ? "Sign-in" : "Sign-Up"}</h3>
            <input
              className="form--input mt-5"
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
            <p
              className="text-button"
              onClick={() => setSwitchSign(!switchSign)}
            >
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
  return (
    <Modal
      show={RequestResults.completed}
      onHide={() =>
        setRequestResults({ completed: false, succeeded: false, message: "" })
      }
    >
      <ModalBody
        className={
          RequestResults.succeeded
            ? "text-success text-center fw-bold"
            : "text-danger text-center fw-bold"
        }
      >
        {RequestResults.message}
      </ModalBody>
      <ModalFooter className="text-center">
        <Button
          onClick={() =>
            setRequestResults({
              completed: false,
              succeeded: "false",
              message: "",
            })
          }
          variant="outline-danger"
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
