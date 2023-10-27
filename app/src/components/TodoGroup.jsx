import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TodoGroup = () => {
  const [todos, setTodos] = useState([]);

  const { groupId } = useParams();

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get(`http://localhost:3000/todos/${groupId}`);
      setTodos(res.data);
    };

    fetchTodos();
  }, [groupId]);

  const todosElement = todos.map((todo) => (
    <div key={todo._id}>
      <h1>{todo.title}</h1>
      <h3>{todo.content}</h3>
      <h3>{todo.date}</h3>
      <h3>{todo.deadline}</h3>
      {todo.urgent ? "!!" : ""}
    </div>
  ));

  return <>{todosElement}</>;
};

export default TodoGroup;
