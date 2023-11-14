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

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "todos",
        children: [
          { path: "", element: <TodoGroupsPage /> },
          { path: "new", element: <CreateTodoGroupPage /> },
          {
            path: ":groupId",
            children: [
              { path: "", element: <TodoGroupPage /> },
              { path: "new", element: <CreateTodoPage /> },
              { path: "edit", element: <EditTodoGroupPage /> },
              {
                path: ":todoId",
                children: [
                  { path: "", element: <TodoPage /> },
                  { path: "edit", element: <EditTodoPage /> },
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
