import axios from "axios";
const baseURL = "http://localhost:5000/api";

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
  MakeWorker: async (payload) => {
    return axios
      .post("Users/CreateWorker", payload)
      .then((res) => res.data)
      .catch((err) => err);
  },
  GetWorkersInfo: async (payload) => {
    return axios
      .get(`Users/GetWorkerInfo/${payload}`)
      .then((res) => res.data)
      .catch((err) => err);
  },
  Downgrade: async (userId) => {
    return axios
      .put(`Users/Downgrade/${userId}`)
      .then((res) => res.data)
      .catch((err) => err);
  },
};
