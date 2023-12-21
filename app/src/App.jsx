import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import TodoGroupPage from "./pages/TodoGroupPage";
import TodoPage from "./pages/TodoPage";
import TodoGroupsPage from "./pages/TodoGroupsPage";
import CreateTodoGroupPage from "./pages/CreateTodoGroupPage";
import EditTodoGroupPage from "./pages/EditTodoGroupPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import EditTodoPage from "./pages/EditTodoPage";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MUIAuthForm from "./components/AuthForm";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "todos",
        children: [
          {
            path: "",
            element: localStorage.getItem("token") ? (
              <TodoGroupsPage />
            ) : (
              <Navigate to="/auth/login" />
            ),
          },
          {
            path: "new",
            element: localStorage.getItem("token") ? (
              <CreateTodoGroupPage />
            ) : (
              <Navigate to="/auth/login" />
            ),
          },
          {
            path: ":groupId",
            children: [
              {
                path: "",
                element: localStorage.getItem("token") ? (
                  <TodoGroupPage />
                ) : (
                  <Navigate to="/auth/login" />
                ),
              },
              {
                path: "new",
                element: localStorage.getItem("token") ? (
                  <CreateTodoPage />
                ) : (
                  <Navigate to="/auth/login" />
                ),
              },
              {
                path: "edit",
                element: localStorage.getItem("token") ? (
                  <EditTodoGroupPage />
                ) : (
                  <Navigate to="/auth/login" />
                ),
              },
              {
                path: ":todoId",
                children: [
                  {
                    path: "",
                    element: localStorage.getItem("token") ? (
                      <TodoPage />
                    ) : (
                      <Navigate to="/auth/login" />
                    ),
                  },
                  {
                    path: "edit",
                    element: localStorage.getItem("token") ? (
                      <EditTodoPage />
                    ) : (
                      <Navigate to="/auth/login" />
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "auth",
        children: [
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
      {
        path: "/test",
        element: (
          <MUIAuthForm
            action="REGISTER"
            onSubmit={(data) => console.log(data)}
          />
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
