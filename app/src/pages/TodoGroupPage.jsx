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
      const res = await axios.get(`http://localhost:3000/todos/${groupId}`);
      setGroup(res.data);
    };

    fetchTodos();
  }, [groupId]);

  const deleteGroupHandler = () => {
    axios
      .delete(`http://localhost:3000/todos/${groupId}`)
      .then(() => {
        console.log("Group deleted!");
        navigate("/todos");
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <TodoGroup group={group} />
      <button onClick={deleteGroupHandler}>Delete Group</button>
    </>
  );
};

export default TodoGroupPage;
