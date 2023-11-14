import axios from "axios";

export const register = async (userData) => {
  const res = await axios.post("http://localhost:3000/auth/register", {
    username: userData.username,
    email: userData.email,
    password: userData.password,
  });

  if (res.status === 401) {
    console.log("Registration failed");
    return;
  }

  localStorage.setItem("token", res.data.token);
  return res.data.token;
};

export const login = async (userData) => {
  console.log(userData);
};
