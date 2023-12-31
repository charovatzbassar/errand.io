import { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import { getTodo, updateTodo } from "../utils/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditTodoPage = () => {
  const [todoData, setTodoData] = useState({});
  const { groupId, todoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodoData();
  }, [groupId, todoId]);

  const fetchTodoData = async () => {
    const data = await getTodo(todoId, groupId);
    const formattedData = {
      ...data,
      ...(data.deadline && {
        deadline: new Date(data.deadline),
      }),
    };
    setTodoData(formattedData);
  };

  const onSubmit = async (data) => {
    try {
      const updatedTodoData = {
        title: data.title,
        urgent: data.urgent,
        ...(data.content && { content: data.content }),
        ...(data.deadline && { deadline: data.deadline }),
      };

      if (todoData.date > updatedTodoData.deadline) return;

      await updateTodo(todoId, groupId, updatedTodoData);
      navigate(`/todos/${groupId}/${todoId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <ArrowBackIcon
        sx={{ margin: "10px", cursor: "pointer" }}
        onClick={() => navigate(`/todos/${groupId}/${todoId}`)}
      />{" "}
      <TodoForm action="EDIT" onSubmit={onSubmit} data={todoData} />
    </>
  );
};

export default EditTodoPage;
