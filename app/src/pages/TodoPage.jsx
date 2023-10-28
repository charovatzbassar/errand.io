import { useState, useEffect } from "react";
import Todo from "../components/Todo";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TodoPage = () => {
  const [todo, setTodo] = useState({});

  const { groupId, todoId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get(
        `http://localhost:3000/todos/${groupId}/${todoId}`
      );
      setTodo(res.data[0]);
    };

    fetchTodos();
  }, [groupId, todoId]);

  const deleteTodoHandler = () => {
    axios
      .delete(`http://localhost:3000/todos/${groupId}/${todoId}`)
      .then(() => {
        console.log("Todo deleted!");
        navigate(`/todos/${groupId}`);
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <Todo todo={todo} />
      <button onClick={deleteTodoHandler}>Delete</button>
    </>
  );
};

export default TodoPage;
