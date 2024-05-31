import axios from "axios";

export const getDestinationsApi = async () => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      "http://localhost:8086/v1/ds/destinations/destinations-list",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    throw error;
  }
};

export const createDestinationApi = async (formData) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.post(
      "http://localhost:8086/v1/ds/destinations/create-destinations",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating destination:", error);
    throw error;
  }
};

export const getDestinationByIdApi = async (id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      `http://localhost:8086/v1/ds/destinations/destinations-list/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting destination by id:", error);
    throw error;
  }
};

export const updateDestinationApi = async (formData, id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.patch(
      `http://localhost:8086/v1/ds/destinations/edit-destinations/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating destination:", error);
    throw error;
  }
};

export const deleteDestinationApi = async (id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.delete(
      `http://localhost:8086/v1/ds/destinations /delete-destinations/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting destination:", error);
    throw error;
  }
};
