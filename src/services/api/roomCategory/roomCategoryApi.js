import axios from "axios";

export const saveRoomCategoryApi = async (formData) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.post(
      "http://localhost:8086/v1/rc/roomcategory/create-roomcategory",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating room category:", error);
    throw error;
  }
};

export const getRoomCategoryApi = async () => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      "http://localhost:8086/v1/rc/roomcategory/roomcategory-list",
      //formData,
      // data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching room category:", error);
    throw error;
  }
};

export const getRoomCategoryByIdApi = async (id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      `http://localhost:8086/v1/rc/roomcategory/roomcategory-list/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching facility by ID:", error);
    throw error;
  }
};

export const roomCategoryUpdateApi = async (formData, id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const data = new FormData();
    data.append("name", formData.name);
    const response = await axios.patch(
      `http://localhost:8086/v1/rc/roomcategory/edit-roomcategory/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error updating room category:", error);
    throw error;
  }
};

export const deleteRoomCategory = async (id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.delete(
      `http://localhost:8086/v1/rc/roomcategory/delete-roomcategory/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting room category:", error);
    throw error;
  }
};
