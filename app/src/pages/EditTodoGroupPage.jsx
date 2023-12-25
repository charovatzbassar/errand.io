import { useEffect, useState } from "react";
import TodoGroupForm from "../components/TodoGroupForm";
import { getTodoGroupData, updateTodoGroup } from "../utils/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditTodoGroupPage = () => {
  const [todoGroupData, setTodoGroupData] = useState({});
  const { groupId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodoGroupData();
  }, [groupId]);

  const fetchTodoGroupData = async () => {
    const data = await getTodoGroupData(groupId);
    setTodoGroupData(data);
  };

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
      <ArrowBackIcon
        sx={{ margin: "10px", cursor: "pointer" }}
        onClick={() => navigate(`/todos/${groupId}`)}
      />{" "}
      <TodoGroupForm action="EDIT" onSubmit={onSubmit} data={todoGroupData} />
    </>
  );
};

export default EditTodoGroupPage;
