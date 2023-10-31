import { Link } from "react-router-dom";

const TodoGroups = ({ todoGroups }) => {
  const todoGroupsElement = todoGroups.map((todoGroup) => (
    <div key={todoGroup._id}>
      <Link to={`/todos/${todoGroup._id}`}>{todoGroup.title}</Link>
    </div>
  ));

  return <>{todoGroupsElement}</>;
};

export default TodoGroups;
