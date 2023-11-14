import React from "react";
import AuthForm from "../components/AuthForm";
import { login } from "../utils/auth";

const LoginPage = () => {
  const onSubmit = async (data) => {
    await login(data);
  };

  return <AuthForm action="LOGIN" onSubmit={onSubmit} />;
};

export default LoginPage;
