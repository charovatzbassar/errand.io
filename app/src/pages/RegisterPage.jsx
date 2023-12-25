import { register } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    if (data.password === data.repeatPassword) {
      await register(data);
      return navigate("/todos");
    }
  };

  return <AuthForm action="REGISTER" onSubmit={onSubmit} />;
};

export default RegisterPage;
