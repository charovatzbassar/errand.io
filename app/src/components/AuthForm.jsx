import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";

const MUIAuthForm = ({ action, onSubmit }) => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  return (
    <>
      {action === "REGISTER" ? "Register to Errand.io" : "Log in to Errand.io"}
      <form onSubmit={handleSubmit(onSubmit)}>
        {action === "REGISTER" && (
          <>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              {...register("email", { required: "Email is required!" })}
            />
            <div className="error">{errors.email && errors.email.message}</div>
          </>
        )}
        <TextField
          label="Username"
          {...register("username", { required: "Username is required!" })}
        />
        <div className="error">
          {errors.username && errors.username.message}
        </div>

        <TextField
          {...register("password", {
            required: "Password is required!",
            pattern:
              action === "REGISTER"
                ? {
                    value:
                      /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{6,}$/,
                    message:
                      "Password must contain an uppercase character, a number, a special character, and must be at least 6 characters long",
                  }
                : null,
          })}
          label="Password"
          type="password"
          variant="outlined"
        />
        <div className="error">
          {errors.password && errors.password.message}
        </div>
        {action === "REGISTER" && (
          <>
            {" "}
            <TextField
              variant="outlined"
              label="Repeat Password"
              {...register("repeatPassword", {
                required: "Please repeat the password!",
                validate: {
                  passwordsEqual: (value) =>
                    value === getValues().password || "Passwords must match!",
                },
              })}
              type="password"
            />
            <div className="error">
              {errors.repeatPassword && errors.repeatPassword.message}
            </div>
          </>
        )}
        <Button type="submit" variant="contained" color="primary">
          {action === "REGISTER" ? "Register" : "Login"}
        </Button>
      </form>
    </>
  );
};

export default MUIAuthForm;
