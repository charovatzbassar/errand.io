import { useNavigate, useParams } from "react-router-dom";
import TodoGroup from "../components/TodoGroup";
import axios from "axios";
import { useState, useEffect } from "react";

const TodoGroupPage = () => {
  const [group, setGroup] = useState([]);

  const { groupId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/todos/${groupId}`);
        setGroup(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchTodos();
  }, [groupId, group]);

  const deleteGroupHandler = () => {
    axios
      .delete(`http://localhost:3000/todos/${groupId}`)
      .then(() => {
        console.log("Group deleted!");
        navigate("/todos");
      })
      .catch((e) => console.error(e));
  };

  const toggleAttributeHandler = async (attribute, todoId) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/todos/${groupId}/${todoId}/${attribute}`
      );
      setGroup((currentGroup) =>
        currentGroup.map((todo) => {
          return { ...todo, [res.data[attribute]]: res.data[attribute] };
        })
      );
      console.log("Attribute toggled!");
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
