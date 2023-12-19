import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
              <LoginPage />
            ),
          },
          {
            path: "new",
            element: localStorage.getItem("token") ? (
              <CreateTodoGroupPage />
            ) : (
              <LoginPage />
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
                  <LoginPage />
                ),
              },
              {
                path: "new",
                element: localStorage.getItem("token") ? (
                  <CreateTodoPage />
                ) : (
                  <LoginPage />
                ),
              },
              {
                path: "edit",
                element: localStorage.getItem("token") ? (
                  <EditTodoGroupPage />
                ) : (
                  <LoginPage />
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
                      <LoginPage />
                    ),
                  },
                  {
                    path: "edit",
                    element: localStorage.getItem("token") ? (
                      <EditTodoPage />
                    ) : (
                      <LoginPage />
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
