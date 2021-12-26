import axios from "axios";

const instance = axios.create({
  baseURL: "https://kibo-skill-matrix.herokuapp.com/api/",
});

export default instance;
