import React from "react";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
  const onSubmit = (data) => {
    if (data.password === data.repeatPassword) console.log(data);
  };

  return <AuthForm action="REGISTER" onSubmit={onSubmit} />;
};

export default RegisterPage;
