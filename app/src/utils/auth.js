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

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());
  window.location.href = "/todos";
  return res.data.token;
};

export const login = async (userData) => {
  const res = await axios.post("http://localhost:3000/auth/login", {
    username: userData.username,
    password: userData.password,
  });

  if (res.status === 500) {
    console.log("Invalid credentials");
    return;
  }

  localStorage.setItem("token", res.data.token);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());
  window.location.href = "/todos";
  return res.data.token;
};

export const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  window.location.href = "/";
};

export function checkAuth() {
  const token = getAuthToken();

  if (!token) {
    window.location.href = "/auth/login";
  }

  return null;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const duration = getTokenDuration();

  if (duration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();

  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}
