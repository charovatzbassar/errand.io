import { useNavigate, useParams } from "react-router-dom";
import TodoGroup from "../components/TodoGroup";
import { useState, useEffect } from "react";
import { toggleAttribute, getTodoGroup, deleteTodoGroup } from "../utils/api";

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
    <>
      <button onClick={() => navigate("/todos")}>Back</button>
      <TodoGroup group={group} toggleAttribute={toggleAttributeHandler} />
      <button onClick={() => navigate(`/todos/${groupId}/new`)}>
        New Todo
      </button>
      <button onClick={() => navigate(`/todos/${groupId}/edit`)}>
        Edit Group
      </button>
      <button onClick={deleteGroupHandler}>Delete Group</button>
      {group === undefined || group.length == 0 ? "Could not fetch todos" : ""}
    </>
  );
};

export default TodoGroupPage;
