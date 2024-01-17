import axios from "axios";

export const getAllFacilityList = async (formData) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      "http://localhost:8086/v1/new/facility/get-facilities",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating  facility :", error);
    throw error;
  }
};

export const facilityCreateApi = async (formData) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const data = new FormData();
    data.append("facilityName", formData.name);
    data.append("image", formData.media);
    const response = await axios.post(
      "http://localhost:8086/v1/new/facility/create-facility",
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
    console.error("Error creating facility:", error);
    throw error;
  }
};

export const facilityUpdateApi = async (formData, id) => {
  try {
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("facilityName", formData.name);
    data.append("image", formData.media);
    console.log("data in api send: ", data);
    const response = await axios.patch(
      `http://localhost:8086/v1/new/facility/update-facility/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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

export const deleteFacilityApi = async (facilityId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `http://localhost:8086/v1/new/facility/delete-facility/${facilityId}`,
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
