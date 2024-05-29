import axios from "axios";

export const getActivitiesApi = async () => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      "http://localhost:8086/v1/at/activities/activities-list",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Assuming you want to return the response data
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
}

export const createActivityApi = async (formData) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.post(
      "http://localhost:8086/v1/at/activities/create-activities",
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
    console.error("Error creating activity:", error);
    throw error;
  }
};

export const getActivityByIdAPI = async (id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      `http://localhost:8086/v1/at/activities/activities-list/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error getting activity by id", error);
    throw error;
  }
};

export const activityUpdateApi = async (formData, id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.patch(
      `http://localhost:8086/v1/at/activities/edit-activities/${id}`,
      formData,
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
    console.error("Error updating activity:", error);
    throw error;
  }
};

export const deleteActivityAPI = async (id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.delete(
      `http://localhost:8086/v1/at/activities/delete-activities/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting activity:", error);
    throw error;
  }
};
