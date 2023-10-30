import axios from "axios";

export const toggleAttribute = async (todoId, groupId, attribute) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/todos/${groupId}/${todoId}/${attribute}`
    );

    return res.data.attribute;
  } catch (e) {
    console.error(e);
  }
};

export const deleteTodo = async (todoId, groupId) => {
  try {
    await axios.delete(`http://localhost:3000/todos/${groupId}/${todoId}`);
  } catch (e) {
    console.error(e);
  }
};

export const getTodo = async (todoId, groupId) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/todos/${groupId}/${todoId}`
    );
    return res.data[0];
  } catch (e) {
    console.error(e);
  }
};

export const getTodoGroup = async (groupId) => {
  try {
    const res = await axios.get(`http://localhost:3000/todos/${groupId}`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const deleteTodoGroup = async (groupId) => {
  try {
    await axios.delete(`http://localhost:3000/todos/${groupId}`);
  } catch (e) {
    console.error(e);
  }
};

export const getTodoGroups = async () => {
  try {
    const res = await axios.get("http://localhost:3000/todos");
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const createTodoGroup = async (todoGroup) => {
  try {
    await axios.post("http://localhost:3000/todos", todoGroup);
  } catch (e) {
    console.error(e);
  }
};

export const updateTodoGroup = async (groupId, newTodoGroup) => {
  try {
    await axios.put(`http://localhost:3000/todos/${groupId}`, newTodoGroup);
  } catch (e) {
    console.error(e);
  }
};

export const getTodoGroupData = async (groupId) => {
  try {
    const res = await axios.get(`http://localhost:3000/todos/${groupId}/data`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
