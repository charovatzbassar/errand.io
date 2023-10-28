import { Link } from "react-router-dom";

const Todo = ({ todo }) => {
  return (
    <div key={todo._id}>
      <Link to={`/todos/${todo.todoGroup}/${todo._id}`}>
        {todo.title} {todo.urgent ? "*" : ""}
      </Link>
      <h3>{todo.content}</h3>
      <h3>Created at: {todo.date}</h3>
      <h3>Deadline: {todo.deadline}</h3>
    </div>
  );
};

export default Todo;
