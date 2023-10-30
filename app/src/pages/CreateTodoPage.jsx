import { useNavigate, useParams } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import { createTodo } from "../utils/api";

const CreateTodoPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await createTodo(groupId, data);
      navigate(`/todos/${groupId}`);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <button onClick={() => navigate(`/todos/${groupId}`)}>Back</button>
      <TodoForm action="CREATE" onSubmit={onSubmit} />
    </>
  );
};

export default CreateTodoPage;
