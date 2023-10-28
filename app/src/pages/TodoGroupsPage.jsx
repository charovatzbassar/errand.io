import TodoGroups from "../components/TodoGroups";
import { useState, useEffect } from "react";
import axios from "axios";

const TodoGroupsPage = () => {
  const [todoGroups, setTodoGroups] = useState([]);

  useEffect(() => {
    const fetchTodoGroups = async () => {
      try {
        const res = await axios.get("http://localhost:3000/todos");
        setTodoGroups(res.data);
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
