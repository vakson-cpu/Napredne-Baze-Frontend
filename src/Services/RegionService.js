import axios from "axios";
const baseURL = "http://localhost:5000/api";

axios.defaults.baseURL = baseURL;

export const RegionService = {
  GetRegions: async () =>
    axios
      .get("Regions/GetAll")
      .then((res) => res.data)
      .catch((err) => err),
  UpdateWorker: async (workerId, regionId, salary) =>
    axios
      .put("Regions/UpdateWorker", {
        userId: workerId,
        Salary: salary,
        regionid: regionId,
      })
      .then((res) => res.data)
      .catch((err) => err),
};
