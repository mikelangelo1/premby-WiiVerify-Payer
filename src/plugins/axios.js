import axios from "axios";
import { BASE_URL } from "../constants";

let baseURL = BASE_URL + "/api/";

const instance = axios.create({
  baseURL,
});

export { baseURL };
export default instance;
