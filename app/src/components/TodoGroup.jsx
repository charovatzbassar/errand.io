import Todo from "./Todo";

const TodoGroup = ({ group }) => {
  return (
    <>
      {group.map((todo) => (
        <Todo key={todo._id} todo={todo} />
      ))}
    </>
  );
};

export default TodoGroup;
