import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoGroupPage from "./pages/TodoGroupPage";
import TodoPage from "./pages/TodoPage";
import TodoGroupsPage from "./pages/TodoGroupsPage";
import CreateTodoGroupPage from "./pages/CreateTodoGroupPage";

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
          { path: ":todoId", element: <TodoPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
