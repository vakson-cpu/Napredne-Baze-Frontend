import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { UserService } from "../../Services/UserService";
import { useSelector } from "react-redux";
import "./ConfigureUserModal.css";
import { RegionService } from "../../Services/RegionService";
const ConfigureUserModal = ({ show, onClose, userId, roleId, setUsers }) => {
  const WORKER = 2;
  const USER = 3;
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [first, setFirst] = useState(true);
  const Regions = useSelector((state) => state.RegionSlice.regions);
  const [selectedRegion, setSelectedRegion] = useState(1);
  const [RequestResponse, setRequestResponse] = useState({
    completed: false,
    succeeded: false,
    message: "",
  });
  const [UserInfo, setUserInfo] = useState({
    role: roleId,
    name: roleId === 2 ? "Worker" : "User",
  });
  const handleReset = () => {
    setRequestResponse({ ...RequestResponse, completed: false });
    onClose(false);
    setFirst(true);
  };
  const [Salary, setSalary] = useState("");

  const handleSubmit = async () => {
    let token= localStorage.getItem('token');
    if (UserInfo.role === WORKER) {
      try {
        if (roleId === UserInfo.role) {
          let result = await RegionService.UpdateWorker(
            userId,
            selectedRegion,
            Salary,
            token
          );
          if (result.succeeded) {
            let users = await UserService.GetAllUsers();
            setUsers(users.data);
            setRequestResponse({
              completed: true,
              succeeded: true,
              message: "Successful changes",
            });
            return;
          } else {
            setRequestResponse({
              completed: true,
              succeeded: false,
              message: "Something went Wrong!",
            });
            return;
          }
        }

        //Case if its a new user to become a worker
        else {
          let result = await UserService.MakeWorker({
            userId,
            Salary,
            regionId: selectedRegion,
          },token);
          if (result.succeeded) {
            let users = await UserService.GetAllUsers();
            setUsers(users.data);
            setRequestResponse({
              completed: true,
              succeeded: true,
              message: "Successful changes",
            });
            return;
          } else {
            setRequestResponse({
              completed: true,
              succeeded: false,
              message: "Something went Wrong!",
            });
            return;
          }
        }
      } catch (err) {
        setRequestResponse({
          completed: true,
          succeeded: false,
          message: "Something went Wrong!",
        });
        return;
      }
    } else {
      try {
        //Downgrade user to worker
        let result = await UserService.Downgrade(userId,token);
        if (result.succeeded) {
          let users = await UserService.GetAllUsers();
          setUsers(users.data);
          setRequestResponse({
            completed: true,
            succeeded: true,
            message: "Successful changes",
          });
          return;
        } else {
          setRequestResponse({
            completed: true,
            succeeded: false,
            message: "Something went wrong...",
          });
          return;
        }
      } catch (err) {
        setRequestResponse({
          completed: true,
          succeeded: false,
          message: "Something went wrong...",
        });
        return;
      }
    }
  };
  const handleFetchInfo = async () => {
    let result = await UserService.GetWorkersInfo(userId);
    setSalary(result.data.salary);
    setSelectedRegion(result.data.regionId);
  };

  useEffect(() => {
    if (roleId === WORKER) handleFetchInfo(userId);
    setUserInfo({
      role: roleId || 1,
      ...(roleId === 2 ? { name: "Worker" } : { name: "User" }),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const handleSelectChange = (value) => {
    if (value === "Worker") setUserInfo({ role: WORKER, name: "Worker" });
    else setUserInfo({ role: USER, name: "User" });
  };
  // const handleChecked = (item) => {

  //   if (selectedRegion === item.id) return true;
  //   return false;
  // };
  if (RequestResponse.completed === false)
    return (
      <div>
        <Modal
          show={show}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="bg-dark text-white">
            <Modal.Title id="contained-modal-title-vcenter bg-dark">
              Edit User
            </Modal.Title>
          </Modal.Header>
          {isLoading === false ? (
            <Modal.Body className="bg-dark  d-flex flex-column justify-content-center ">
              <div>
                <label className="text-warning mx-5 mt-3">Edit Role</label>
                <select
                  value={UserInfo.name}
                  onChange={(e) => handleSelectChange(e.target.value)}
                >
                  <option>Worker</option>
                  <option>User</option>
                </select>
              </div>

              {UserInfo.role === WORKER && (
                <div>
                  <label className="text-warning mx-5 mt-2">Salary</label>
                  <input
                    className="mt-5"
                    type="text"
                    value={Salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                  <br style={{ marginBottom: "50px" }}></br>
                  <div className="mx-5">
                    <h3 className="text-white fw-bold">
                      Select a Region to work in
                    </h3>
                    {Regions.map((item, index) => (
                      <div key={index} className="gridRadio ">
                        <label className="text-warning">{item.name}</label>{" "}
                        <input
                          key={index + 3}
                          className="text-warning"
                          name="radioz"
                          style={{ width: "18px" }}
                          type="radio"
                          value={item.id}
                          checked={+item.id === +selectedRegion}
                          onChange={(e) => setSelectedRegion(e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Modal.Body>
          ) : (
            <div className="text-center mt-5">
              <Spinner
                className="m-auto text-center text-danger"
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          <Modal.Footer className="bg-dark">
            <Button variant="outline-danger" onClick={() => onClose(false)}>
              Close
            </Button>
            <Button variant="outline-warning" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-center"
    >
      <Modal.Header
        className={
          RequestResponse.succeeded
            ? "bg dark text-success text-center"
            : "bg dark text-danger text-center"
        }
      >
        <Modal.Title
          className="text-center"
          id="contained-modal-title-vcenter "
          onClick={() => handleReset()}
        >
          {RequestResponse.message}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Button className="text-center" onClick={() => handleReset()} variant="outline-danger">
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ConfigureUserModal;
