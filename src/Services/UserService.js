import axios from "axios";
const baseURL = "http://vakson-001-site1.atempurl.com/api";

axios.defaults.baseURL = baseURL;

export const UserService = {
  Register: async (registrationData) =>
    await axios
      .post("Users/register", registrationData)
      .then((res) => {
        console.log(res)
        return res.data;
      })
      .catch((err) => {
        console.log((err) => err);
      }),

  LogIn: async (credentials) =>
    await axios
      .post("Users/login", credentials)
      .then((res) => {
        const responseData = res.data;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${responseData.data}`;
        return responseData;
      })
      .catch((err) => err),
  GetAllUsers: async () => {
    return await axios
      .get("Users/GetAllUsers")
      .then((res) => res.data)
      .catch((err) => err);
  },
  MakeWorker: async (payload,token) => {
    return axios
      .post("Users/CreateWorker", payload,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }})
      .then((res) => res.data)
      .catch((err) => err);
  },
  GetWorkersInfo: async (payload) => {
    return axios
      .get(`Users/GetWorkerInfo/${payload}`)
      .then((res) => res.data)
      .catch((err) => err);
  },
  Downgrade: async (userId,token) => {
    return axios
      .put(`Users/Downgrade/${userId}`,{},{
        headers: {
          'Authorization': `Bearer ${token}` 
        }})
      .then((res) => res.data)
      .catch((err) => err);
  },
};
