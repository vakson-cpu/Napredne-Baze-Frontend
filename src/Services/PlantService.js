import axios from "axios";
const baseURL = "http://localhost:5000/api";

axios.defaults.baseURL = baseURL;

export const PlantSrevice = {
  CreatePlant: async (fileSelected) =>{
    const formData = new FormData();
    formData.append("file", fileSelected);
    console.log(formData);
    await axios
      .post("Plants/Create",formData)
      .then((res) => res)
      .catch((err) => err)},
  CreatePlant2: async (fileSelected) =>{
    const formData = new FormData();
    formData.append("file", fileSelected);
    console.log(formData);
    await axios
      .post("Plants/ImportFile",formData
      )
      .then((res) => res)
      .catch((err) => err)},
};
