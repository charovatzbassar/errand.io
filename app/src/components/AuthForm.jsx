import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import AuthFormBackground from "./AuthFormBackground";

const AuthForm = ({ action, onSubmit }) => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  return (
    <AuthFormBackground>
      <div className="flex justify-center items-center h-screen w-screen fixed">
        <Box
          sx={{
            width: "500px",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            py: 3,
            px: 3,
            backgroundColor: "white",
            borderRadius: "1em",
          }}
        >
          <h5 className="text-lg text-center sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            {action === "REGISTER"
              ? "Register to Errand.io"
              : "Log in to Errand.io"}{" "}
          </h5>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col m-5">
            {action === "REGISTER" && (
              <>
                <TextField
                  sx={{ marginBottom: "20px" }}
                  label="Email"
                  variant="outlined"
                  type="email"
                  {...register("email", { required: "Email is required!" })}
                />
                <div className="error">
                  {errors.email && errors.email.message}
                </div>
              </>
            )}
            <TextField
              sx={{ marginBottom: "20px" }}
              label="Username"
              {...register("username", { required: "Username is required!" })}
            />
            <div className="error">
              {errors.username && errors.username.message}
            </div>
            <TextField
              sx={{ marginBottom: "20px" }}
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
                  sx={{ marginBottom: "20px" }}
                  variant="outlined"
                  label="Repeat Password"
                  {...register("repeatPassword", {
                    required: "Please repeat the password!",
                    validate: {
                      passwordsEqual: (value) =>
                        value === getValues().password ||
                        "Passwords must match!",
                    },
                  })}
                  type="password"
                />
                <div className="error">
                  {errors.repeatPassword && errors.repeatPassword.message}
                </div>
              </>
            )}

            <Button
              sx={{ marginBottom: "20px" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              {action === "REGISTER" ? "Register" : "Login"}
            </Button>
          </form>
        </Box>
      </div>
    </AuthFormBackground>
  );
};

export default AuthForm;
