import axios from "axios";

export const saveRoomCategoryApi = async (formData) => {
  console.log("formdata in saveRoomCategoryApi", formData);
  try {
    //   const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    //   const data = new FormData();
    //   data.append("facilityName", formData.name);
    //   data.append("image", formData.media);
    const response = await axios.post(
      "http://localhost:8086/v1/rc/roomcategory/create-roomcategory",
      formData,
      // data,
      {
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating facility:", error);
    throw error;
  }
};

export const getRoomCategoryApi = async () => {
  try {
    //   const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    //   const data = new FormData();
    //   data.append("facilityName", formData.name);
    //   data.append("image", formData.media);
    const response = await axios.get(
      "http://localhost:8086/v1/rm/roomcategory/get-roomcategory",
      //formData,
      // data,
      {
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating facility:", error);
    throw error;
  }
};

export const getRoomCategoryByIdApi = async (id) => {
  console.log(id);
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      `http://localhost:8086/v1/rm/roomcategory/get-roomcategory/${id}`,
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
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("name", formData.name);
    const response = await axios.patch(
      `http://localhost:8086/v1/rm/roomcategory/update-roomcategory/${id}`,
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
    console.error("Error updating facility:", error);
    throw error;
  }
};

export const deleteRoomCategory = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `http://localhost:8086/v1/rm/roomcategory/delete-roomcategory/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting facility:", error);
    throw error;
  }
};
