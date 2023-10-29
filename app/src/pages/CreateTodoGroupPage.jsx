import TodoGroupForm from "../components/TodoGroupForm";
import { createTodoGroup } from "../utils/api";
import { useNavigate } from "react-router-dom";

const CreateTodoGroupPage = () => {
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await createTodoGroup(data);
    navigate("/todos");
  };

  return (
    <>
      <TodoGroupForm action="CREATE" onSubmit={onSubmit} />
    </>
  );
};

export default CreateTodoGroupPage;
