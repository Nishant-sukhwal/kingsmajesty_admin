import axios from 'axios';
import { loginUserSuccessful } from '../../../store/actions';

export const login = async (formData) => {
  try {
    // Make the API call using Axios
    const response = await axios.post(
      'http://localhost:8086/v1/auth/login',
      {
        email: formData.username,
        password: formData.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
    
  } catch {
    console.log('Error in API call:');
    // throw error;
  }
}


export const logout = async (token) => {
  try {
    const response = await axios.post(
      'http://localhost:8086/v1/auth/logout',
      {
        token: token
      })
    return response;
  } catch {
    console.log("Logout Failed!");
  }
}

