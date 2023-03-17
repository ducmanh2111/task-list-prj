import api from "../utils/api";

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
    .then(response => {
      console.log(response)
      const user_info = {
        'access-token': response.headers.get('access-token'),
        'client': response.headers.get('client'),
        'uid': response.headers.get('uid')
      }
      localStorage.setItem('user_info', JSON.stringify(user_info));
    });
};

const logout = () => {
  localStorage.removeItem('user_info');
};

const auth = {
  register,
  login,
  logout,
};

export default auth;
