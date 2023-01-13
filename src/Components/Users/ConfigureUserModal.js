import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { UserService } from "../../Services/UserService";
import { useSelector } from "react-redux";
import './ConfigureUserModal.css'
const ConfigureUserModal = ({ show, onClose, userId, roleId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const Regions = useSelector((state) => state.RegionSlice.regions);
  console.log(Regions);
  const [RequestResponse, setRequestResponse] = useState({
    completed: false,
    succeeded: false,
    message: "",
  });

  console.log(true + true);
  const [UserInfo, setUserInfo] = useState({
    role: roleId || 1,
    name: roleId === 2 ? "Worker" : "User",
  });
  const handleReset = () => {};
  const [Salary, setSalary] = useState("");
  const WORKER = 2;
  const USER = 3;
  const handleSubmit = async () => {
    if (UserInfo.role === WORKER) {
      let result = await UserService.MakeWorker({ userId, Salary });
      if (result === undefined || result === null) {
        setRequestResponse({
          completed: true,
          succeeded: false,
          message: "Something went Wrong!",
        });
        return;
      }
      if (result.succeeded) {
        setRequestResponse({
          completed: true,
          succeeded: true,
          message: "Successful changes",
        });
        return;
      }
    }
  };
  const handleFetchInfo = async () => {
    let result = await UserService.GetWorkersInfo(userId);
    console.log("rezult is", result);
  };

  useEffect(() => {
    if (UserInfo.role === WORKER) handleFetchInfo(userId);
    setUserInfo({
      role: roleId || 1,
      ...(roleId === 2 ? { name: "Worker" } : { name: "User" }),
    });
  }, [roleId]);

  const handleSelectChange = (value) => {
    if (value === "Worker") setUserInfo({ role: WORKER, name: "Worker" });
    else setUserInfo({ role: USER, name: "User" });
  };
  console.log("UserInfo ", UserInfo);
  const handleSelectValue = (value) => {};
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
                <label className="text-warning mx-5 mt-b">Edit Role</label>
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
                    type="text"
                    value={Salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                  {Regions.map((item) => (
                    <div className="gridRadio">
                      <label className='text-white'>{item.name}</label> <input type="radio" />
                    </div>
                  ))}
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
    >
      <Modal.Header
        className={
          RequestResponse.succeeded
            ? "bg dark text-success"
            : "bg dark text-danger"
        }
      >
        <Modal.Title
          id="contained-modal-title-vcenter bg-dark"
          onClick={handleReset}
        >
          {RequestResponse.message}
        </Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default ConfigureUserModal;
