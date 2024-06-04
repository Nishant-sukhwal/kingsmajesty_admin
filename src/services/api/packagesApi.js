import axios from "axios";

export const getPackagesApi = async () => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      "http://localhost:8086/v1/pk/packages/packages-list",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

export const createPackageApi = async (formData) => {
  try {
    const formDataToSend = new FormData();
    // Append thumbnail
    formDataToSend.append("thumbnail", formData.thumbnail);

    formDataToSend.append("title", formData.title);
    formDataToSend.append("subtitle", formData.subtitle);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("endDate", formData.endDate);
    formDataToSend.append("startDate", formData.startDate);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("priceType", formData.priceType);
    formDataToSend.append("homepage", formData.homepage);
    formDataToSend.append("release", formData.release);

    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.post(
      "http://localhost:8086/v1/pk/packages/create-packages",
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
    console.error("Error creating package:", error);
    throw error;
  }
};

export const getPackageByIdApi = async (id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      `http://localhost:8086/v1/pk/packages/packages-list/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting package by id:", error);
    throw error;
  }
};

export const updatePackageApi = async (id,formData) => {
  try {
    const formDataToSend = new FormData();
    // Append thumbnail if it's a File instance
    if (formData.thumbnail instanceof File) {
      formDataToSend.append("thumbnail", formData.thumbnail);
    }

    //other fields
    formDataToSend.append("title", formData.title);
    formDataToSend.append("subtitle", formData.subtitle);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("startDate", formData.startDate);
    formDataToSend.append("endDate", formData.endDate);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("priceType", formData.priceType);
    formDataToSend.append("homepage", formData.homepage);
    formDataToSend.append("release", formData.release);
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.patch(
      `http://localhost:8086/v1/pk/packages/edit-packages/${id}`,
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
    console.error("Error updating package:", error);
    throw error;
  }
};

export const deletePackageApi = async (id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.delete(
      `http://localhost:8086/v1/pk/packages/delete-packages/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting package:", error);
    throw error;
  }
};
