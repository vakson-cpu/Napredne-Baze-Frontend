import React, { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
const ConfigureUserModal = ({ show, onClose, userId, roleId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const WORKER = 2;
  const handleSubmit = () => {

    
  };
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
        <Modal.Body className="bg-dark  d-flex flex-column justify-content-center ">
          <div>
            <label>Edit Role</label>
            <select>
              <option>Administrator</option>
              <option>Worker</option>
              <option>User</option>
            </select>
          </div>

          {roleId === WORKER && (
            <div>
              <label>Salary</label>
              <input type="text" />
            </div>
          )}
        </Modal.Body>
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
};

export default ConfigureUserModal;
