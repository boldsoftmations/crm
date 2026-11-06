import axios from "axios";

const CustomAxios = axios.create({
  baseURL: import.meta.env.REACT_APP_DEPLOY_BACKEND_URL,
});

export default CustomAxios;
