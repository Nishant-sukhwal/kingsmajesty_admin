import axios from 'axios';

const getSidebarMenus = async (token) => {
  try {
    const response = await axios.get("http://localhost:8086/v1/api/admin/auth/sidebar-menus", {
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
};

export default getSidebarMenus;


