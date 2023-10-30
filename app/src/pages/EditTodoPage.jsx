import { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import { getTodo, updateTodo } from "../utils/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditTodoPage = () => {
  const [todoData, setTodoData] = useState({});
  const { groupId, todoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodoData = async () => {
      const data = await getTodo(todoId, groupId);
      setTodoData(data);
    };

    fetchTodoData();
  }, [groupId, todoId]);

  const onSubmit = async (data) => {
    try {
      await updateTodo(todoId, groupId, data);
      navigate(`/todos/${groupId}/${todoId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <TodoForm action="EDIT" onSubmit={onSubmit} data={todoData} />
    </>
  );
};

export default EditTodoPage;
