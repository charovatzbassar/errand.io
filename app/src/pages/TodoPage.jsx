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
      try {
        const res = await axios.get(
          `http://localhost:3000/todos/${groupId}/${todoId}`
        );
        setTodo(res.data[0]);
      } catch (e) {
        console.error(e);
      }
    };

    fetchTodos();
  }, [groupId, todoId, todo]);

  const deleteTodoHandler = () => {
    axios
      .delete(`http://localhost:3000/todos/${groupId}/${todoId}`)
      .then(() => {
        console.log("Todo deleted!");
        navigate(`/todos/${groupId}`);
      })
      .catch((e) => console.error(e));
  };

  const toggleAttributeHandler = async (attribute) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/todos/${groupId}/${todoId}/${attribute}`
      );
      setTodo({ ...todo, [res.data[attribute]]: res.data[attribute] });
      console.log("Attribute toggled!");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Todo
        todo={todo}
        toggleUrgent={() => toggleAttributeHandler("urgent")}
        toggleCompleted={() => toggleAttributeHandler("completed")}
      />
      <button onClick={deleteTodoHandler}>Delete</button>
    </>
  );
};

export default TodoPage;
