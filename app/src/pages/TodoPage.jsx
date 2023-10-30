import { useState, useEffect } from "react";
import Todo from "../components/Todo";
import { useParams, useNavigate } from "react-router-dom";
import { toggleAttribute, deleteTodo, getTodo } from "../utils/api";

const TodoPage = () => {
  const [todo, setTodo] = useState({});

  const { groupId, todoId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const currentTodo = await getTodo(todoId, groupId);
        setTodo(currentTodo);
      } catch (e) {
        console.error(e);
      }
    };

    fetchTodo();
  }, [groupId, todoId, todo]);

  const deleteTodoHandler = async () => {
    try {
      await deleteTodo(todoId, groupId);
      navigate(`/todos/${groupId}`);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleAttributeHandler = async (attribute) => {
    try {
      const toggledAttribute = await toggleAttribute(
        todoId,
        groupId,
        attribute
      );
      setTodo({ ...todo, [attribute]: toggledAttribute });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button onClick={() => navigate(`/todos/${groupId}`)}>Back</button>
      <Todo
        todo={todo}
        toggleUrgent={() => toggleAttributeHandler("urgent")}
        toggleCompleted={() => toggleAttributeHandler("completed")}
      />
      <button onClick={() => navigate(`/todos/${groupId}/${todoId}/edit`)}>
        Edit
      </button>
      <button onClick={deleteTodoHandler}>Delete</button>
    </>
  );
};

export default TodoPage;
