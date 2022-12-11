import axios from "axios";
const baseURL = "http://localhost:5000/api";

axios.defaults.baseURL = baseURL;

export const PlantSrevice = {
  CreatePlant: async (plant,file) =>{
    let bodyFormData= new FormData();
    bodyFormData.append("file",file);
    bodyFormData.append("plant",plant)
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
      });}
      ,CreatePlant2: async (plant) =>{
        console.log(plant)
        let bodyFormData= new FormData();
        bodyFormData.append('LatinName',plant.LatinName)
        bodyFormData.append('LocalName',plant.LocalName)
        bodyFormData.append('ProtectionId',plant.ProtectionId)
        bodyFormData.append('Regions',plant.Regions)
        bodyFormData.append('file',plant.file)


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
          });},
      
  };

  