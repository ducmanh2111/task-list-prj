import api from "../utils/api-client";

const register = (email, password) => {
  return api.post("/auth", {
    email,
    password
  });
};

const login = (email, password) => {
  return api
    .post("/auth/sign_in", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const auth = {
  register,
  login,
  logout,
};

export default auth;
