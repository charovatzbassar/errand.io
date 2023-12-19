import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/auth/register")}>Register</button>
      <button onClick={() => navigate("/auth/login")}>Log In</button>
    </>
  );
};

export default HomePage;
