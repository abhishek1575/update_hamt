import http from "../http.js";
import Config from "../Config";

const BASE_URL = Config.API_BASE_URL + "api/users/";

export const getUserProfile = (id) => {
  return http.get(`${BASE_URL}${id}`);
};
