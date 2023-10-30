import TodoGroupForm from "../components/TodoGroupForm";
import { updateTodoGroup } from "../utils/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditTodoGroupPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await updateTodoGroup(groupId, data);
      navigate(`/todos/${groupId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <TodoGroupForm action="EDIT" onSubmit={onSubmit} />
    </>
  );
};

export default EditTodoGroupPage;
