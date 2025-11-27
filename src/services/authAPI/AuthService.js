import axios from "axios";
import config from "../Config";

const BASE_URL = config.API_BASE_URL + "auth/";

class AuthService {
  async login(email, password) {
    const response = await axios.post(
      BASE_URL + "login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.jwt) {
      // console.log("We are Logged in");
      sessionStorage.setItem("userId", response.data.id);
      sessionStorage.setItem("email", response.data.email);
      sessionStorage.setItem("name", response.data.name);

      sessionStorage.setItem("role", response.data.role);
      sessionStorage.setItem("type", response.data.type);
      sessionStorage.setItem("token", response.data.jwt);
      sessionStorage.setItem("isLoggedIn", true);
      console.log(sessionStorage.getItem("userId"));
      console.log(sessionStorage.getItem("email"));
      console.log(sessionStorage.getItem("name"));
      console.log(sessionStorage.getItem("email"));
      console.log(sessionStorage.getItem("role"));
    }
    return response;
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
  }

  getCurrentUser() {
    return {
      id: sessionStorage.getItem("userId"),
      name: sessionStorage.getItem("name"),
      email: sessionStorage.getItem("email"),
      role: sessionStorage.getItem("role"),
      token: sessionStorage.getItem("token"),
      type: sessionStorage.getItem("type"),
    };
  }

  authHeader() {
    const token = sessionStorage.getItem("token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }
}

export default new AuthService();
