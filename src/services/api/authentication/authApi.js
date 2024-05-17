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

export const getAllSidebarMenu = async () => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get("http://localhost:8086/v1/sidemenu/sidebar-menu", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sidebar menus:", error);
    throw error;
  }
}



export const getAllPermissionApi = async () => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get("http://localhost:8086/v1/pr/permission/get-permission", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in Permission access", error);
    throw error;
  }
}


