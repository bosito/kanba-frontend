import axios from 'axios';

const BASE_URL = `http://localhost:9000/api/v1`;
const RESOURCE = '/status';

export const getStatus = async () => {
  try {
    const tasks = await axios.get(`${BASE_URL}${RESOURCE}`);
    return tasks.data;
  } catch(e) {
    throw e;
  }
}