import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoGroupPage from "./pages/TodoGroupPage";
import TodoPage from "./pages/TodoPage";
import TodoGroupsPage from "./pages/TodoGroupsPage";
import CreateTodoGroupPage from "./pages/CreateTodoGroupPage";
import EditTodoGroupPage from "./pages/EditTodoGroupPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import EditTodoPage from "./pages/EditTodoPage";

const router = createBrowserRouter([
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
