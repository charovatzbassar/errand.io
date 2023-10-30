import { useEffect } from "react";
import { useForm } from "react-hook-form";

const TodoGroupForm = ({ action, onSubmit, data = {} }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  let buttonMessage = "";

  switch (action) {
    case "CREATE":
      buttonMessage = "Create";
      break;
    case "EDIT":
      buttonMessage = "Edit";
      break;
    default:
      buttonMessage = "";
      break;
  }

  useEffect(() => {
    if (action === "EDIT") reset({ title: data.title });
  }, [data, reset, action]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Group Title</label>
      <div className="form-group">
        <input
          {...register("title", { required: "Group title is required!" })}
          type="text"
        />
        <div className="error">{errors.title && errors.title.message}</div>
      </div>
      <div className="form-group">
        <button>{buttonMessage} Group</button>
      </div>
    </form>
  );
};

export default TodoGroupForm;
