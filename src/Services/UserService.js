import axios from "axios";
import jwt_decode from "jwt-decode";
const baseURL = "http://localhost:5000/api/Users";

axios.defaults.baseURL = baseURL;

export  const UserService = {

  Register: async(registrationData) =>
    await axios
      .post("register", registrationData)
      .then((res) =>{ 
        console.log("Rezultat: ",res.data);
        return res.data;})
      .catch((err) => {console.log(err=>err)}),

  LogIn: async(credentials) =>
    await axios.post("login", credentials).then((res) => {
    
      const responseData = res.data;
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${responseData.data}`;
      return responseData;
    }).catch(err=>err),
};
