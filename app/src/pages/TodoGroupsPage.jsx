import TodoGroups from "../components/TodoGroups";
import { useState, useEffect } from "react";
import { getTodoGroups } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { Button } from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";

const TodoGroupsPage = () => {
  const [todoGroups, setTodoGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodoGroups();
  }, []);

  const fetchTodoGroups = async () => {
    try {
      const currentTodoGroups = await getTodoGroups();
      setTodoGroups(currentTodoGroups);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button onClick={logout}>Log Out</button>
      <TodoGroups todoGroups={todoGroups} />
      <Button variant="contained" onClick={() => navigate("/todos/new")}>
        <AddCircle />
      </Button>
      {todoGroups === undefined || todoGroups.length == 0
        ? "No todo groups"
        : ""}
    </>
  );
};

export default TodoGroupsPage;
