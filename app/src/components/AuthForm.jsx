import { useForm } from "react-hook-form";
const AuthForm = ({ action, onSubmit }) => {
  const {
    handleSubmit,
    register,
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
          {...register("password", { required: "Password is required!" })}
          type="password"
        />
        <div className="error">
          {errors.password && errors.password.message}
        </div>
      </div>
      <div className="form-group">
        <button>{action === "REGISTER" ? "Register" : "Login"}</button>
      </div>
    </form>
  );
};

export default AuthForm;
