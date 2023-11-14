import React from "react";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return <AuthForm action="LOGIN" onSubmit={onSubmit} />;
};

export default LoginPage;
