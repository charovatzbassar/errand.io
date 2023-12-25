import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { TextField, Button, Switch } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const TodoForm = ({ action, onSubmit, data = {} }) => {
  const {
    handleSubmit,
    register,
    reset,
    control,
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
      <TextField
        sx={{ margin: "10px" }}
        label={action === "CREATE" ? "Title" : ""}
        variant="outlined"
        type="title"
        {...register("title", { required: "Todo title is required!" })}
      />
      <div className="error">{errors.title && errors.title.message}</div>

      <TextField
        sx={{ margin: "10px" }}
        label={action === "CREATE" ? "Content" : ""}
        variant="outlined"
        type="content"
        {...register("content")}
      />
      <div className="error">{errors.content && errors.content.message}</div>
      <div className="flex m-[10px]">
        <label htmlFor="urgent">Urgent</label>
        <Switch
          {...register("urgent")}
          checked={action === "EDIT" && data.urgent}
        />
        <div className="error">{errors.urgent && errors.urgent.message}</div>
      </div>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          name="deadline"
          control={control}
          defaultValue={action === "EDIT" ? new Date(data.deadline) : null}
          render={({ field }) => (
            <DatePicker
              {...field}
              label="Deadline"
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        />
      </LocalizationProvider>

      <div className="error">{errors.deadline && errors.deadline.message}</div>
      <Button
        sx={{ margin: "10px" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        {buttonMessage} Todo
      </Button>
    </form>
  );
};

export default TodoForm;
