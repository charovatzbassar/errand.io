import { useState } from "react";
import TodoGroupForm from "../components/TodoGroupForm";
import { createTodoGroup } from "../utils/api";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CreateTodoGroupPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await createTodoGroup(data);
      if (res?.message) {
        setError(res.message);
        return;
      }
      navigate("/todos");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <ArrowBackIcon
        sx={{ margin: "10px", cursor: "pointer" }}
        onClick={() => navigate("/todos")}
      />
      <TodoGroupForm action="CREATE" onSubmit={onSubmit} />
      {error}
    </>
  );
};

export default CreateTodoGroupPage;
