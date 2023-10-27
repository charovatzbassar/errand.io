import TodoGroups from "./components/TodoGroups";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoGroup from "./components/TodoGroup";

const router = createBrowserRouter([
  {
    path: "todos",
    children: [
      { path: "", element: <TodoGroups /> },
      { path: ":groupId", element: <TodoGroup /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
