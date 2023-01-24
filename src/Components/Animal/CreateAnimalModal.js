import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ListOfAnimals.css";
import { useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { AnimalService } from "../../Services/AnimalService";
import { GetRegions } from "../../Redux/RegionSlice";
export default function CreateAnimalModal({
  show,
  onClose,
  setShow1,
  setShow2,
  regionId,
  setRegion,
}) {
  const ImageRef = useRef();
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");
  const [LocalName, setLocalName] = useState("");
  const [LatinName, setLatinName] = useState("");
  const [Villages, setVillages] = useState("");
  const [isLoading, setIsLoadng] = useState(false);
  const [errorFlags, setErrorFlags] = useState({ error: false, message: "" });

  const dispatch = useDispatch();

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

  const handleSubmit = async () => {
    // setIsLoadng(true);
    let token = localStorage.getItem("token");
    if (
      LatinName === "" ||
      LocalName === "" ||
      file === "" ||
      Villages === ""
    ) {
      setErrorFlags({ error: true, message: "All fields must be filled" });
      return;
    }
    let regions = [regionId];
    let response = await AnimalService.InsertAnimal(
      {
        LatinName: LatinName,
        LocalName: LocalName,
        Villages: Villages,
        file: file,
        Regions: regions,
      },
      token
    );
    if (response !== undefined) {
      if (response.succeeded === true) {
        dispatch(GetRegions());
        setIsLoadng(false);
        setShow1(true);
        onClose(false);
        return;
      } else {
        setShow2(true);
        onClose(false);
      }
    } else {
      setShow2(true);
      onClose(false);
    }
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
            Create Animal
          </Modal.Title>
        </Modal.Header>
        {isLoading === false ? (
          <Modal.Body className="bg-dark  d-flex flex-column justify-content-center ">
            <Row className="m-auto mb-4 mt-4">
              <Col>
                {" "}
                <label className="text-white mr-1  " style={{ width: "110px" }}>
                  Latin Name:{" "}
                </label>
              </Col>
              <Col>
                <input
                  value={LatinName}
                  onChange={(e) => setLatinName(e.target.value)}
                  type="text"
                  className="input-modal"
                />
              </Col>
            </Row>
            <Row className="m-auto">
              <Col className="text-white" style={{ width: "110px" }}>
                Local Name:{" "}
              </Col>
              <Col>
                <input
                  value={LocalName}
                  onChange={(e) => setLocalName(e.target.value)}
                  type="text"
                  className="input-modal"
                />
              </Col>
            </Row>
            <Row className=" mt-4 d-flex flex-row  m-auto">
              <Col>
                <label className="text-white" style={{ width: "110px" }}>
                  Villages:{" "}
                </label>
              </Col>
              <Col>
                <input
                  value={Villages}
                  onChange={(e) => setVillages(e.target.value)}
                  type="text"
                  className="input-modal"
                />
              </Col>
            </Row>
            {/* <Row>
              <Col className="mt-5  text-center m-auto ">
                <label className="text-white fs-5">Pick a Region</label>
                {regions.map((item) => {
                  return (
                    <div key={item.id} className="regions-box-animal">
                      <label className="label-checkbox">{item.name}</label>
                      <input
                        type="checkbox"
                        value={item.id}
                        onChange={handleChecked}
                      />
                    </div>
                  );
                })}
              </Col>
            </Row> */}
            <div className="mt-4 d-flex flex-row m-auto ">
              <Button
                onClick={() => handlePickImage()}
                variant="outline-warning"
              >
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
                <img
                  className="image-box-preview-animal"
                  src={url}
                  alt="nece"
                />
              ) : (
                "Preview..."
              )}
            </div>
            {errorFlags.error && (
              <span className="text-center text-danger">
                {errorFlags.message}
              </span>
            )}
          </Modal.Body>
        ) : (
          <Modal.Body>
            <p className="text-white text-center">"Loading..."</p>
          </Modal.Body>
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
}
