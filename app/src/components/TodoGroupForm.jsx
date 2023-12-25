import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";

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
      <TextField
        sx={{ margin: "10px" }}
        label={action === "CREATE" ? "Group Title" : ""}
        variant="outlined"
        type="title"
        {...register("title", { required: "Group title is required!" })}
      />
      <div className="error">{errors.title && errors.title.message}</div>

      <Button
        sx={{ margin: "10px" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        {buttonMessage} Group
      </Button>
    </form>
  );
};

export default TodoGroupForm;
