import { useForm } from "react-hook-form";

const TodoGroupForm = ({ action, onSubmit }) => {
  const {
    handleSubmit,
    register,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Group Title</label>
      <div className="form-group">
        <input
          type="text"
          {...register("title", { required: "Group title is required!" })}
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
