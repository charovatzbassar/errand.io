import { useForm } from "react-hook-form";
const AuthForm = ({ action, onSubmit }) => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {action === "REGISTER" && (
        <>
          <label htmlFor="email">Email</label>
          <div className="form-group">
            <input
              {...register("email", { required: "Email is required!" })}
              type="email"
            />
            <div className="error">{errors.email && errors.email.message}</div>
          </div>
        </>
      )}
      <label htmlFor="username">Username</label>
      <div className="form-group">
        <input
          {...register("username", { required: "Username is required!" })}
          type="text"
        />
        <div className="error">
          {errors.username && errors.username.message}
        </div>
      </div>
      <label htmlFor="password">Password</label>
      <div className="form-group">
        <input
          {...register("password", {
            required: "Password is required!",
            pattern: {
              value:
                /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{6,}$/,
              message:
                "Password must contain an uppercase character, a number, a special character, and must be at least 6 characters long",
            },
          })}
          type="password"
        />
        <div className="error">
          {errors.password && errors.password.message}
        </div>
      </div>
      {action === "REGISTER" && (
        <>
          {" "}
          <label htmlFor="repeatPassword">Repeat Password</label>
          <div className="form-group">
            <input
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
          </div>
        </>
      )}
      <div className="form-group">
        <button>{action === "REGISTER" ? "Register" : "Login"}</button>
      </div>
    </form>
  );
};

export default AuthForm;
