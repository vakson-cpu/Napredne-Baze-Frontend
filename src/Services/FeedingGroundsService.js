import axios from "axios";
const baseURL = "http://vakson-001-site1.atempurl.com/api";

axios.defaults.baseURL = baseURL;

export const FeedingGroundsService = {
  GetByRegionId: async (id, pageNumber) =>
    await axios
      .get(`FeedingGrounds/Get/Region/${id}?pageNumber=${pageNumber}`)
      .then((res) => res.data)
      .catch((err) => err),
  GetFeedingGroundById: async (id) =>
    await axios
      .get(`FeedingGrounds/Get/${id}`)
      .then((res) => res.data)
      .catch((err) => err),
  AddAnimalToFeedingGrounds: async (animalId, feedingGroundId, firstSeen,token) => {
    await axios
      .put("FeedingGrounds/AddAnimal", {
        animalId: animalId,
        feedingGroundId: feedingGroundId,
        firstSeen: firstSeen,
      },{
        headers: {
          'Authorization': `Bearer ${token}` 
        }})
      .then((res) => res.data)
      .catch((err) => err);
  },
  GetAllFeedingGrounds: async () => {
    return axios
      .get("FeedingGrounds/GetAll")
      .then((res) => res.data)
      .catch((err) => err);
  },
  GetWorkersInFeedingGround: async (fgid) => {
    return axios
      .get(`FeedingGrounds/Workers/${fgid}`)
      .then((res) => res.data)
      .catch((err) => err);
  },
  GetWorkersAndOptions: async (fgid, regionId) => {
    return axios
      .get(`FeedingGrounds/GetCheckList/${fgid}?regionId=${regionId}`)
      .then((res) => res.data)
      .catch((err) => err);
  },
  AddWorkerToFg: async (workers, fgid,token) => {
    return axios
      .put(`FeedingGrounds/AddWorkers/${fgid}`, { workers: workers },{
        headers: {
          'Authorization': `Bearer ${token}` 
        }})
      .then((res) => res.data)
      .catch((err) => err);
  },
  RemoveWorkersFromFg: async (userId, fgid,token) => {
    return axios.delete(`FeedingGrounds/RemoveWorker/${fgid}?userId=${userId}`,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }});
  },
};
export default FeedingGroundsService;
