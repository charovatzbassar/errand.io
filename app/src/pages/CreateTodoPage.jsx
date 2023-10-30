import { useNavigate, useParams } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import { createTodo } from "../utils/api";

const CreateTodoPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const todoData = {
        title: data.title,
        urgent: data.urgent,
        ...(data.content && { content: data.content }),
        ...(data.deadline && { deadline: data.deadline }),
      };

      await createTodo(groupId, todoData);
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
