import axios from "axios";

export const toggleAttribute = async (todoId, groupId, attribute) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/todos/${groupId}/${todoId}/${attribute}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return res.data[attribute];
  } catch (e) {
    return { ...e, message: "Could not toggle attribute" };
  }
};

export const deleteTodo = async (todoId, groupId) => {
  try {
    await axios.delete(`http://localhost:3000/todos/${groupId}/${todoId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (e) {
    return { ...e, message: "Could not delete todo" };
  }
};

export const getTodo = async (todoId, groupId) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/todos/${groupId}/${todoId}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return res.data;
  } catch (e) {
    if (e.response.status === 400) {
      window.location.href = "/todos";
      return;
    }
    return {};
  }
};

export const getTodoGroup = async (groupId) => {
  try {
    const res = await axios.get(`http://localhost:3000/todos/${groupId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return res.data;
  } catch (e) {
    if (e.response.status === 400) {
      window.location.href = "/todos";
      return;
    }
    return [];
  }
};

export const deleteTodoGroup = async (groupId) => {
  try {
    await axios.delete(`http://localhost:3000/todos/${groupId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (e) {
    return { ...e, message: "Could not delete todo group" };
  }
};

export const getTodoGroups = async () => {
  try {
    const res = await axios.get("http://localhost:3000/todos", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return res.data;
  } catch (e) {
    return [];
  }
};

export const createTodoGroup = async (todoGroup) => {
  try {
    await axios.post("http://localhost:3000/todos", todoGroup, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (e) {
    return { ...e, message: "Could not create todo group" };
  }
};

export const updateTodoGroup = async (groupId, newTodoGroup) => {
  try {
    await axios.put(`http://localhost:3000/todos/${groupId}`, newTodoGroup, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (e) {
    return { ...e, message: "Could not edit todo group" };
  }
};

export const getTodoGroupData = async (groupId) => {
  try {
    const res = await axios.get(`http://localhost:3000/todos/${groupId}/data`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return res.data;
  } catch (e) {
    if (e.response.status === 400) {
      window.location.href = "/todos";
      return;
    }
    return {};
  }
};

export const createTodo = async (groupId, todo) => {
  try {
    await axios.post(`http://localhost:3000/todos/${groupId}`, todo, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (e) {
    return { ...e, message: "Could not create todo" };
  }
};

export const updateTodo = async (todoId, groupId, newTodo) => {
  try {
    await axios.put(
      `http://localhost:3000/todos/${groupId}/${todoId}`,
      newTodo,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  } catch (e) {
    return { ...e, message: "Could not edit todo" };
  }
};
