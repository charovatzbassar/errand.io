import { useNavigate, useParams } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import { createTodo } from "../utils/api";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CreateTodoPage = () => {
  const [error, setError] = useState("");
  const { groupId } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // try {
    //   const todoData = {
    //     title: data.title,
    //     urgent: data.urgent,
    //     ...(data.content && { content: data.content }),
    //     ...(data.deadline && { deadline: data.deadline }),
    //   };

    //   const currentDate = new Date();
    //   const todoDeadline = new Date(todoData.deadline);

    //   if (currentDate > todoDeadline) return;

    //   const res = await createTodo(groupId, todoData);
    //   if (res?.message) {
    //     setError(res.message);
    //     return;
    //   }
    //   navigate(`/todos/${groupId}`);
    // } catch (e) {
    //   console.error(e);
    // }
    console.log(data);
  };
  return (
    <>
      <ArrowBackIcon
        sx={{ margin: "10px", cursor: "pointer" }}
        onClick={() => navigate(`/todos/${groupId}`)}
      />{" "}
      <TodoForm action="CREATE" onSubmit={onSubmit} />
      {error}
    </>
  );
};

export default CreateTodoPage;
