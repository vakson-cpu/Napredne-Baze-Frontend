import axios from "axios";
const baseURL = "http://localhost:5000/api";

axios.defaults.baseURL = baseURL;

export const PlantSrevice = {
  CreatePlant: async (plant,token) => {
    console.log(plant);
    let bodyFormData = new FormData();
    console.log(token);
    bodyFormData.append("LatinName", plant.LatinName);
    bodyFormData.append("LocalName", plant.LocalName);
    bodyFormData.append("ProtectionId", plant.ProtectionId);
    for (let i = 0; i < plant.Regions.length; i++)
      bodyFormData.append("Regions", plant.Regions[i]);
    bodyFormData.append("file", plant.file);    
    // let help = JSON.stringify(token);
    let res = axios
      .post("Plants/Create", bodyFormData,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }})
      .then((res) => {
        
        return res.data;
      })
      .catch((res) => res);
    return res;
  },
  GetAllPlants:async (pageNumber,SortBy,sortValue,Rarity)=>{
    let result = axios.get(`Plants/Getall?pageNumber=${pageNumber}&SortBy=${SortBy}&sortValue=${sortValue}&Rarity=${Rarity}`).then(res=>res.data).catch(err=>err);
    return result;
  }
};
