import { Link } from "react-router-dom";

const Todo = ({ todo = {}, toggleUrgent, toggleCompleted }) => {
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${String(day).padStart(2, "0")}-${String(month).padStart(
      2,
      "0"
    )}-${year}`;
  };

  return (
    <div key={todo._id}>
      <Link to={`/todos/${todo.todoGroup}/${todo._id}`}>
        {todo.title} {todo.urgent ? "*" : ""} {todo.completed ? "$" : ""}
      </Link>
      <h3>{todo.content}</h3>
      <h3>Created at: {formatDate(new Date(todo.date))}</h3>
      <h3>Deadline: {formatDate(new Date(todo.deadline))}</h3>
      <button onClick={toggleCompleted}>Check</button>
      <button onClick={toggleUrgent}>Urgent</button>
    </div>
  );
};

export default Todo;
