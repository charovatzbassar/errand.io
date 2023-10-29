import { useNavigate, useParams } from "react-router-dom";
import TodoGroup from "../components/TodoGroup";
import { useState, useEffect } from "react";
import { toggleAttribute, getTodoGroup, deleteTodoGroup } from "../utils/api";

const TodoGroupPage = () => {
  const [group, setGroup] = useState([]);

  const { groupId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const currentTodos = await getTodoGroup(groupId);
        setGroup(currentTodos);
      } catch (e) {
        console.error(e);
      }
    };

    fetchTodos();
  }, [groupId, group]);

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
      setGroup((currentGroup) =>
        currentGroup.map((todo) => {
          return { ...todo, [attribute]: toggledAttribute };
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <TodoGroup group={group} toggleAttribute={toggleAttributeHandler} />
      <button onClick={deleteGroupHandler}>Delete Group</button>
    </>
  );
};

export default TodoGroupPage;
