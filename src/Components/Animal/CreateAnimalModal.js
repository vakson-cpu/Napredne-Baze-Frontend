import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ListOfAnimals.css";
export default function CreateAnimalModal({ show, onClose }) {
  const ImageRef = useRef();
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");
  const [LocalName, setLocalName] = useState("");
  const [LatinName, setLatinName] = useState("");
  const [Villages, setVillages] = useState("");
  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const handlePickImage = (e) => {
    ImageRef.current.click();
  };
  console.log(Villages)
  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-dark text-white">
        <Modal.Title id="contained-modal-title-vcenter bg-dark">
          Create Animal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark  d-flex flex-column justify-content-center ">
        <div className="mt-4 d-flex flex-row  m-auto ">
          <label className="text-white mr-1 ">Latin Name: </label>
          <input
            value={LatinName}
            onChange={(e) => setLatinName(e.target.value)}
            type="text"
            className="input-modal"
          />
        </div>
        <div className="mt-4 d-flex flex-row m-auto ">
          <label className="text-white mr-1">Local Name: </label>
          <input
            value={LocalName}
            onChange={(e) => setLocalName(e.target.value)}
            type="text"
            className="input-modal"
          />
        </div>
        <div className=" mt-4 d-flex flex-row  m-auto">
          <label className="text-white">Villages: </label>
          <input
            value={Villages}
            onChange={(e) => setVillages(e.target.value)}
            type="text"
            className="input-modal"
          />
        </div>
        <div className="mt-4 d-flex flex-row m-auto ">
          <Button onClick={() => handlePickImage()} variant="outline-warning">
            Add Image
          </Button>
          <input
            ref={ImageRef}
            onChange={(e) => setFile(e.target.files[0])}
            className="visually-hidden"
            type="file"
          />
        </div>{" "}
        <div>
          {url ? (
            <img className="image-box-preview-animal" src={url} alt="nece" />
          ) : (
            "Preview..."
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className='bg-dark'>
        <Button variant='outline-danger' onClick={onClose}>Close</Button>
        <Button variant='outline-warning' onClick={onClose}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
