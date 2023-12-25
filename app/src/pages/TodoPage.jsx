import { useState, useEffect } from "react";
import Todo from "../components/Todo";
import { useParams, useNavigate } from "react-router-dom";
import { toggleAttribute, deleteTodo, getTodo } from "../utils/api";
import { Button, ButtonGroup } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const TodoPage = () => {
  const [todo, setTodo] = useState({});

  const { groupId, todoId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const currentTodo = await getTodo(todoId, groupId);
      setTodo(currentTodo);
    } catch (e) {
      console.error(e);
    }
  };

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
    <div className="h-screen relative">
      <ArrowBackIcon
        sx={{ margin: "10px" }}
        onClick={() => navigate(`/todos/${groupId}`)}
      />
      <div className="flex">
        {todo === undefined ||
        (Object.keys(todo).length === 0 && todo.constructor === Object) ? (
          "Could not fetch todo"
        ) : (
          <Todo
            todo={todo}
            toggleUrgent={() => toggleAttributeHandler("urgent")}
            toggleCompleted={() => toggleAttributeHandler("completed")}
          />
        )}
      </div>

      <div className="fixed bottom-2">
        <ButtonGroup
          sx={{ margin: "10px" }}
          variant="text"
          aria-label="text button group"
        >
          <Button onClick={() => navigate(`/todos/${groupId}/${todoId}/edit`)}>
            <EditIcon />
          </Button>
          <Button onClick={deleteTodoHandler}>
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default TodoPage;
