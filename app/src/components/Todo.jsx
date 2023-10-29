import { Link } from "react-router-dom";

const Todo = ({ todo, toggleUrgent, toggleCompleted }) => {
  

  return (
    <div key={todo._id}>
      <Link to={`/todos/${todo.todoGroup}/${todo._id}`}>
        {todo.title} {todo.urgent ? "*" : ""} {todo.completed ? "$" : ""}
      </Link>
      <h3>{todo.content}</h3>
      <h3>Created at: {todo.date}</h3>
      <h3>Deadline: {todo.deadline}</h3>
      <button onClick={toggleCompleted}>Check</button>
      <button onClick={toggleUrgent}>Urgent</button>
    </div>
  );
};

export default Todo;
