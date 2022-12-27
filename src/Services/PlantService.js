import axios from "axios";
const baseURL = "http://localhost:5000/api";

axios.defaults.baseURL = baseURL;

export const PlantSrevice = {
  CreatePlant: async (plant, file) => {
    let bodyFormData = new FormData();
    bodyFormData.append("file", file);
    bodyFormData.append("plant", plant);
    axios({
      method: "post",
      url: "Plants/Create",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  },
  CreatePlant2: async (plant) => {
    console.log(plant);
    let bodyFormData = new FormData();    

    bodyFormData.append("LatinName", plant.LatinName);
    bodyFormData.append("LocalName", plant.LocalName);
    bodyFormData.append("ProtectionId", plant.ProtectionId);
    for (let i = 0; i < plant.Regions.length; i++)
      bodyFormData.append("Regions", plant.Regions[i]);
    bodyFormData.append("file", plant.file);

    axios({
      method: "post",
      url: "Plants/Create",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
       return response
      })
      .catch(function (response) {
        //handle error
        return response;
      });
  },
  CreatePlant3:async(plant)=>{
    
    console.log(plant);
    let bodyFormData = new FormData();    
    
    bodyFormData.append("LatinName", plant.LatinName);
    bodyFormData.append("LocalName", plant.LocalName);
    bodyFormData.append("ProtectionId", plant.ProtectionId);
    for (let i = 0; i < plant.Regions.length; i++)
      bodyFormData.append("Regions", plant.Regions[i]);
    bodyFormData.append("file", plant.file);
    let res= axios.post("Plants/Create",bodyFormData).then(res=>res).catch(res=>res);
    return res;
  }
};
