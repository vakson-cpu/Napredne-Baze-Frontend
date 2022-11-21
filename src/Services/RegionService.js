import axios from "axios";
import jwt_decode from "jwt-decode";
const baseURL = "http://localhost:5000/api/Regions";

axios.defaults.baseURL = baseURL;

export  const UserService = {
  GetRegions: async() =>
    await axios.get("GetAll").then((res) =>res.data ).catch((err)=>err)

};
