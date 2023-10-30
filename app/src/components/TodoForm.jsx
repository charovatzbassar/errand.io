import { useForm } from "react-hook-form";

const TodoForm = ({ action, onSubmit, data = {} }) => {
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
      <label htmlFor="title">Title</label>
      <div className="form-group">
        <input
          type="text"
          {...register("title", { required: "Group title is required!" })}
          defaultValue={data.title}
        />
        <div className="error">{errors.title && errors.title.message}</div>
      </div>
      <label htmlFor="content">Content</label>
      <div className="form-group">
        <input
          type="text"
          {...register("content")}
          defaultValue={data.content}
        />
        <div className="error">{errors.content && errors.content.message}</div>
      </div>
      <label htmlFor="urgent">Urgent</label>
      <div className="form-group">
        <input
          type="checkbox"
          {...register("urgent")}
          defaultValue={data.urgent}
        />
        <div className="error">{errors.urgent && errors.urgent.message}</div>
      </div>
      <label htmlFor="deadline">Deadline</label>
      <div className="form-group">
        <input
          type="date"
          {...register("deadline")}
          defaultValue={data.deadline}
        />
        <div className="error">
          {errors.deadline && errors.deadline.message}
        </div>
      </div>
      <div className="form-group">
        <button>{buttonMessage} Todo</button>
      </div>
    </form>
  );
};

export default TodoForm;
