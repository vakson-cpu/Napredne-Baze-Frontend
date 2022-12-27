import axios from "axios";
const baseURL = "http://localhost:5000/api";

axios.defaults.baseURL = baseURL;

export  const FeedingGroundsService = {
  GetByRegionId: async(id) =>
    await axios.get(`FeedingGrounds/Get/Region/${id}`).then((res) =>res.data ).catch((err)=>err),
  GetFeedingGroundById:async(id)=>
  await axios.get(`FeedingGrounds/Get/${id}`).then(res=>res.data).catch(err=>err)

};
export default FeedingGroundsService;