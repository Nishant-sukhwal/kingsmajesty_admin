import axios from "axios";

export const getAmenitiesApi = async () => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      "http://localhost:8086/v1/am/amenities/amenities-list",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching amenities:", error);
    throw error;
  }
};

export const createAmenityApi = async (formData) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const data = new FormData();
    data.append("name", formData.name);
    data.append("media", formData.media);
    const response = await axios.post(
      "http://localhost:8086/v1/am/amenities/create-amenities",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating amenity:", error);
    throw error;
  }
};

export const getAmenityByIdApi = async (id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      `http://localhost:8086/v1/am/amenities/amenities-list/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting amenity by id:", error);
    throw error;
  }
};

export const updateAmenityApi = async (id, formData) => {
  console.log(id, formData);
  try {
    const formDataToSend = new FormData();
    // Append thumbnail if it's a File instance
    if (formData.media instanceof File) {
      formDataToSend.append("media", formData.media);
    }
    formDataToSend.append("name", formData.name);
    
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.patch(
      `http://localhost:8086/v1/am/amenities/edit-amenities/${id}`,
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating amenity:", error);
    throw error;
  }
};

export const deleteAmenityApi = async (id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.delete(
      `http://localhost:8086/v1/am/amenities/delete-amenities/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting amenity:", error);
    throw error;
  }
};
