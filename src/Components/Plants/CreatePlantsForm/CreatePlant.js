import React, { useRef, useState } from "react";
import "./CreatePlant.css";

const CreatePlant = () => {
  const filePickerRef = useRef();

  const PickImage = () => {
    filePickerRef.current.click();
  };
  const [LatinName, setLatinName] = useState("");
  const [LocalName, setLocalName] = useState("");
  const [regions, setRegions] = useState([]);
  const [protection, setProtection] = useState(1);
  const [file, setFile] = useState("");
  const handleSubmit = async () => {

    
  };
  return (
    <div className="plant-bg">
      <div id="registration-form">
        <div className="fieldset">
          <legend>Add Plant</legend>
          <form action="#" method="post" data-validate="parsley">
            <div className="row">
              <label for="firstname">Latin Name</label>
              <input
                type="text"
                placeholder="Latin Name"
                id="firstname"
                data-required="true"
                data-error-message="Latin Name is required"
                value={LatinName}
                onChange={(e) => setLatinName(e.target.value)}
              />
            </div>
            <div className="row">
              <label for="email">Local Name</label>
              <input
                type="text"
                placeholder="LocalName"
                name="LocalName"
                data-required="true"
                data-error-message="Local Name is required"
                value={LocalName}
                onChange={(e) => setLocalName(e.target.value)}
              />
            </div>
            <div className="row">
              <label for="protection">Protection Level</label>
              <select
                value={protection}
                onChange={(e) => setProtection(e.target.value)}
                className="selection-input w-75"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="row">
              <label for="image">Picture</label>
              <label onClick={PickImage} className="Special--Label">
                Pick a file
              </label>
              <input
                onChange={(e) => setFile(e.target.value)}
                ref={filePickerRef}
                className="image-input"
                type="file"
                placeholder="Image"
                name="image"
                data-required="true"
                data-type="file"
                data-error-message="Image is required"
              />
            </div>

            <input onClick={handleSubmit} type="submit" value="Create" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePlant;
