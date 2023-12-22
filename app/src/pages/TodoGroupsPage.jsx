import TodoGroups from "../components/TodoGroups";
import { useState, useEffect } from "react";
import { getTodoGroups } from "../utils/api";
import { useNavigate } from "react-router-dom";
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
    <div className="h-screen relative">
      {todoGroups === undefined || todoGroups.length == 0 ? (
        "No todo groups"
      ) : (
        <TodoGroups todoGroups={todoGroups} />
      )}
      <div className="fixed bottom-2">
        <Button
          variant="contained"
          sx={{ marginLeft: "10px" }}
          onClick={() => navigate("/todos/new")}
        >
          <AddCircle />
        </Button>
      </div>
    </div>
  );
};

export default TodoGroupsPage;
