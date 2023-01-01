import axios from "axios";
const baseURL = "http://localhost:5000/api";

axios.defaults.baseURL = baseURL;

export const AnimalService = {
  InsertAnimal: async (animal, token) => {
    console.log(animal);
    let bodyFormData = new FormData();
    bodyFormData.append("LatinName", animal.LatinName);
    bodyFormData.append("LocalName", animal.LocalName);
    bodyFormData.append("Villages", animal.Villages);
    for (let i = 0; i < animal.Regions.length; i++)
      bodyFormData.append("Regions", animal.Regions[i]);
    bodyFormData.append("file", animal.file);
    let res = axios
      .post("Animal/AddAnimal", bodyFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((res) => res);
    return res;
  },
  GetAnimalsByRegionId: async (id) => {
    let result =axios
      .get(`Animal/GetAnimalsByRegion/${id}`)
      .then((res) => res.data)
      .catch((err) => err);
    return result;
  },
};
export default AnimalService;
