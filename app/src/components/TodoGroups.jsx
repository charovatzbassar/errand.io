import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TodoGroups = () => {
  const [todoGroups, setTodoGroups] = useState([]);

  useEffect(() => {
    const fetchTodoGroups = async () => {
      const res = await axios.get("http://localhost:3000/todos");
      setTodoGroups(res.data);
    };

    fetchTodoGroups();
  }, []);

  const todoGroupsElement = todoGroups.map((todoGroup) => (
    <div key={todoGroup._id}>
      <Link to={`/todos/${todoGroup._id}`}>{todoGroup.title}</Link>
    </div>
  ));

  return <>{todoGroupsElement}</>;
};

export default TodoGroups;
