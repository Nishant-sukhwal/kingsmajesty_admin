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
  console.log("formData in api ", formData)
  try {
    const formDataToSend = new FormData();
    // Append thumbnail
    formDataToSend.append("thumbnail", formData.thumbnail);
    // Append gallery files
    formData.gallery.forEach((file, index) => {
      formDataToSend.append(`gallery`, file);
    });
    //other fields
    formDataToSend.append("title", formData.title);
    formDataToSend.append("subtitle", formData.subtitle);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("latitude", formData.latitude);
    formDataToSend.append("longitude", formData.longitude);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("homepage", formData.homepage);
    formDataToSend.append("release", formData.release);


    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.post(
      "http://localhost:8086/v1/ds/destinations/create-destinations",
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

export const updateDestinationApi = async (id,formData) => {
  console.log(" api ---------------------->",formData, id)
  try {
    const formDataToSend = new FormData();
    // Append thumbnail if it's a File instance
    if (formData.thumbnail instanceof File) {
      formDataToSend.append("thumbnail", formData.thumbnail);
    }

    // Append gallery files if they are File instances
    if (Array.isArray(formData.gallery)) {
      formData.gallery.forEach((file, index) => {
        if (file instanceof File) {
          formDataToSend.append("gallery", file);
        }
      });
    }
    //other fields
    formDataToSend.append("title", formData.title);
    formDataToSend.append("subtitle", formData.subtitle);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("latitude", formData.latitude);
    formDataToSend.append("longitude", formData.longitude);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("homepage", formData.homepage);
    formDataToSend.append("release", formData.release);

    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.patch(
      `http://localhost:8086/v1/ds/destinations/edit-destinations/${id}`,
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
    console.error("Error updating destination:", error);
    throw error;
  }
};

export const deleteDestinationApi = async (id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.delete(
      `http://localhost:8086/v1/ds/destinations/delete-destinations/${id}`,
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
