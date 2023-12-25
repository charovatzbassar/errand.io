import Todo from "./Todo";

const TodoGroup = ({ group = [], toggleAttribute }) => {
  return (
    <div className="flex flex-wrap">
      {group.map((todo) => (
        <Todo
          key={todo._id}
          todo={todo}
          toggleCompleted={() => toggleAttribute("completed", todo._id)}
          toggleUrgent={() => toggleAttribute("urgent", todo._id)}
        />
      ))}

    </div>
  );
};

export default TodoGroup;
