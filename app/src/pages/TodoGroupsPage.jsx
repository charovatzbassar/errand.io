import TodoGroups from "../components/TodoGroups";
import { useState, useEffect } from "react";
import { getTodoGroups } from "../utils/api";

const TodoGroupsPage = () => {
  const [todoGroups, setTodoGroups] = useState([]);

  useEffect(() => {
    const fetchTodoGroups = async () => {
      try {
        const currentTodoGroups = await getTodoGroups();
        setTodoGroups(currentTodoGroups);
      } catch (e) {
        console.error(e);
      }
    };

    fetchTodoGroups();
  }, []);

  return (
    <>
      <TodoGroups todoGroups={todoGroups} />
    </>
  );
};

export default TodoGroupsPage;
