import { useEffect, useState } from "react";
import TodoGroupForm from "../components/TodoGroupForm";
import { getTodoGroupData, updateTodoGroup } from "../utils/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditTodoGroupPage = () => {
  const [todoGroupData, setTodoGroupData] = useState({});
  const { groupId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodoGroupData = async () => {
      const data = await getTodoGroupData(groupId);
      setTodoGroupData(data);
    };

    fetchTodoGroupData();
  }, [groupId]);

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
      <button onClick={() => navigate(`/todos/${groupId}`)}>Back</button>
      <TodoGroupForm action="EDIT" onSubmit={onSubmit} data={todoGroupData} />
    </>
  );
};

export default EditTodoGroupPage;
