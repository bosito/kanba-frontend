import axios from 'axios';

const BASE_URL = `http://localhost:9000/api/v1`;
const RESOURCE = '/auth/login';

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}${RESOURCE}`, {email, password});
    localStorage.setItem("access_token", response.data.token);
    return response;
  } catch(e) {
    throw e;
  }
}

export const me = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/me`, { headers: {
      authorization: localStorage.getItem("access_token")
    }});
    return response;
  } catch(e) {
    throw e;
  }
}

export const logout = () => {
  localStorage.clear("access_token");
}