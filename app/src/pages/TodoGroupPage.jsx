import { useNavigate, useParams } from "react-router-dom";
import TodoGroup from "../components/TodoGroup";
import { useState, useEffect } from "react";
import { toggleAttribute, getTodoGroup, deleteTodoGroup } from "../utils/api";
import { ButtonGroup, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const TodoGroupPage = () => {
  const [group, setGroup] = useState([]);

  const { groupId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const currentTodos = await getTodoGroup(groupId);
      setGroup(currentTodos);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteGroupHandler = async () => {
    try {
      await deleteTodoGroup(groupId);
      navigate("/todos");
    } catch (e) {
      console.error(e);
    }
  };

  const toggleAttributeHandler = async (attribute, todoId) => {
    try {
      const toggledAttribute = await toggleAttribute(
        todoId,
        groupId,
        attribute
      );
      setGroup((previousGroup) =>
        previousGroup.map((todo) => {
          if (todoId === todo._id)
            return { ...todo, [attribute]: toggledAttribute };
          return todo;
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="h-screen relative">
      <ArrowBackIcon
        sx={{ margin: "10px", cursor: "pointer" }}
        onClick={() => navigate("/todos")}
      />
      {group === undefined || group.length == 0 ? (
        "No todos"
      ) : (
        <TodoGroup group={group} toggleAttribute={toggleAttributeHandler} />
      )}

      <div className="fixed bottom-2">
        <ButtonGroup
          sx={{ margin: "10px" }}
          variant="text"
          aria-label="text button group"
        >
          <Button onClick={() => navigate(`/todos/${groupId}/new`)}>
            <AddCircleIcon />
          </Button>
          <Button onClick={() => navigate(`/todos/${groupId}/edit`)}>
            <EditIcon />
          </Button>
          <Button onClick={deleteGroupHandler}>
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default TodoGroupPage;
