import { useForm } from "react-hook-form";
import { useEffect } from "react";

const TodoForm = ({ action, onSubmit, data = {} }) => {
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
    if (action === "EDIT")
      reset({
        title: data.title,
        content: data.content,
        urgent: data.urgent,
        deadline: data.deadline,
      });
  }, [data, reset, action]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Title</label>
      <div className="form-group">
        <input
          {...register("title", { required: "Todo title is required!" })}
          type="text"
        />
        <div className="error">{errors.title && errors.title.message}</div>
      </div>
      <label htmlFor="content">Content</label>
      <div className="form-group">
        <input {...register("content")} type="text" />
        <div className="error">{errors.content && errors.content.message}</div>
      </div>
      <label htmlFor="urgent">Urgent</label>
      <div className="form-group">
        <input {...register("urgent")} type="checkbox" />
        <div className="error">{errors.urgent && errors.urgent.message}</div>
      </div>
      <label htmlFor="deadline">Deadline</label>
      <div className="form-group">
        <input {...register("deadline")} type="date" />
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
