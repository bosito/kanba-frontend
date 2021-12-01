import axios from 'axios';

const BASE_URL = `http://localhost:9000/api/v1`;
const RESOURCE = '/tasks';

export const addTask = async (taskObj) => {
  try {
    const tasks = await axios.post(`${BASE_URL}${RESOURCE}`, taskObj);
    return tasks.data;
  } catch(e) {
    throw e;
  }
}

export const updateTask = async (taskObj, id) => {
  try {
    const tasks = await axios.put(`${BASE_URL}${RESOURCE}/${id}`, taskObj);
    return tasks.data;
  } catch(e) {
    throw e;
  }
}