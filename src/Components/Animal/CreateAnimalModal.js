import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function CreateAnimalModal({ show, onClose }) {
  const ImageRef= useRef();
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Animal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-black">
        <div className="d-flex flex-row">
          <label className="text-white">Latin Name</label>
          <input type="text" />
        </div>
        <div className="d-flex flex-row">
          <label className="text-white">Local Name</label>
          <input type="text" />
        </div>
        <div className="d-flex flex-row">
          <label className="text-white">Villages</label>
          <input type="text" />
        </div>
        <div className="d-flex flex-row">
          <label className="text-white">Image</label>
          <Button variant='outline-warning' >Add Image</Button>
          <input  ref={ImageRef} className='visually-hidden' type="file" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
