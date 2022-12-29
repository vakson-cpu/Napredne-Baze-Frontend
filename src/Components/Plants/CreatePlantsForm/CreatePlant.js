import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { STATUS } from "../../../Enums/StatusEnum";
import { Alert, Spinner } from "react-bootstrap";
import "./CreatePlant.css";
import { PlantSrevice } from "../../../Services/PlantService";
import { GetRegions } from "../../../Redux/RegionSlice";
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
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [Toast2, setToast2] = useState(false);

  const dispatch = useDispatch();

  const handleProtections = (Prot) => {
    console.log(Prot);
    switch (Prot) {
      case "L1":
        return 1;
      case "L2":
        return 2;
      case "L3":
        return 3;
      default:
        return 1;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let token;
    if (localStorage.key("token") != undefined)
      token = localStorage.getItem("token");
    console.log(token);
    setLoading(true);
    let prot = handleProtections(protection);
    console.log(checkList);
    // let response=await PlantSrevice.CreatePlant({LatinName:LatinName,LocalName:LocalName,ProtectionId:protection,Regions:checkList},file)
    let response = await PlantSrevice.CreatePlant(
      {
        LatinName: LatinName,
        LocalName: LocalName,
        ProtectionId: prot,
        Regions: checkList,
        file: file,
      },
      token
    ).finally((res) => setLoading(false));
    console.log(response);
    if (response.data === undefined) alert("Action Failed");
    if (response.data.succeeded) {
      dispatch(GetRegions());
      alert("Action Succeeded");
    }
  };

  const handleChecked = (e) => {
    let helpArray = checkList.filter((item) => item === e.target.value);
    if (helpArray.length === 0) setCheckList([...checkList, e.target.value]);
    else {
      helpArray = checkList.filter((item) => item !== e.target.value);
      setCheckList([...helpArray]);
    }
  };
  // <div>
  //           <CustomToasty
  //             show={showToast}
  //             handleShow={setShowToast}
  //             description="Successfully Added a plant!"
  //             title="Action succeeded"
  //             color={"success"}
  //             textColor={"text-white"}
  //             position={"start-left"}
  //           />
  //           <CustomToasty
  //             show={Toast2}
  //             handleShow={setToast2}
  //             description="Error while adding a plant!"
  //             title="Action failed"
  //             color={"danger"}
  //             textColor={"text-white"}
  //             position={"start-left"}
  //           />
  //         </div>
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
      <div className="plant-bg text-center mt-5 mb-5">
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
      <div className="bg-plant">
        <div id="registration-form">
          <div className="fieldset">
            <legend>Add Plant</legend>
            {loading === false ? (
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
                  <label>Local Name</label>
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
                  <label>Protection Level</label>
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
                  {url ? (
                    <img className="image-box-preview" src={url} alt="nece" />
                  ) : (
                    "Preview..."
                  )}
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
            ) : (
              <div className="text-center mt-5">
                <Spinner
                  className="m-auto text-center"
                  animation="border"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default CreatePlant;
