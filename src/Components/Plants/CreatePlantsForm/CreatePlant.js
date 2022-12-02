import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { STATUS } from "../../../Enums/StatusEnum";
import { Spinner } from "react-bootstrap";
import "./CreatePlant.css";

const CreatePlant = () => {
  const filePickerRef = useRef();

  const PickImage = () => {
    filePickerRef.current.click();
  };
  const [LatinName, setLatinName] = useState("");
  const [LocalName, setLocalName] = useState("");
  const [protection, setProtection] = useState(1);
  const [file, setFile] = useState("");
  const regions = useSelector((state) => state.RegionSlice.regions);
  const status = useSelector((state) => state.RegionSlice.status);
  const [checkList, setCheckList] = useState([]);
  const [url, setUrl] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("imena su: ", LatinName, " ", LocalName);
  };
  const handleChecked = (e) => {
    let helpArray = checkList.filter((item) => item === e.target.value);
    if (helpArray.length === 0) setCheckList([...checkList, e.target.value]);
    else {
      helpArray = checkList.filter((item) => item !== e.target.value);
      setCheckList([...helpArray]);
    }
  };
  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  console.log(checkList);
  console.log(regions);
  if (status === STATUS.PENDING || status === STATUS.FAILED)
    return (
      <div className="text-center mt-5">
        <Spinner
          className="m-auto text-center"
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  else {
    return (
      <>
        {" "}
        <div id="registration-form">
          <div className="fieldset">
            <legend>Add Plant</legend>
            <form action="#" method="post" data-validate="parsley">
              <div className="row">
                <label>Latin Name</label>
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
              <div className="row mt-2">
                <label>Regions</label>
                {regions.map((item) => {
                  return (
                    <div className="regions-box">
                      <label className="label-checkbox">{item.name}</label>
                      <input
                        type="checkbox"
                        value={item.id}
                        onChange={handleChecked}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="row mt-3">
                <label for="protection">Protection Level</label>
                <select
                  value={protection}
                  onChange={(e) => setProtection(e.target.value)}
                  className="selection-input w-75"
                >
                  <option>L1</option>
                  <option>L2</option>
                  <option>L3</option>
                </select>
              </div>
              <div className="row">
                <label>Picture</label>
                <label onClick={PickImage} className="Special--Label">
                  Pick a file
                </label>
                {url ? <img className="image-box-preview" src={url} alt="nece" /> : "Preview..."}
                <input
                  onChange={(e) => setFile(e.target.files[0])}
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
      </>
    );
  }
};

export default CreatePlant;
