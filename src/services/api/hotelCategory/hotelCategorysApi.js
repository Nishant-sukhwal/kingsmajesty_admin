import axios from "axios";
import { endpoints } from "../../RequestUrls";

// Load environment variables from .env file
// import dotenv from 'dotenv';
// dotenv.config();
export const getHotelCategoriesApi = async (formData) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(`${endpoints.base_url}${endpoints.get_hotel_categories}`,
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

export const HotelCategoryCreateApi = async (formData) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    // const data = new FormData();
    // data.append("name", formData.name);
    const requestData = {
      name: formData.name
      // Add other fields here if needed
    }
    // data.append("image", formData.media);
    const response = await axios.post(
      "http://localhost:8086/v1/hc/hotel-categories/create-hotelcategories",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
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

export const getHotelCategoryByIdApi = async (id) => {
  console.log(id);
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      `http://localhost:8086/v1/hc/hotel-categories/get-hotelcategories/${id}`,
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

export const hotelCategoryUpdateApi = async (formData, id) => {
  try {
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("name", formData.name);
    const response = await axios.patch(
      `http://localhost:8086/v1/hc/hotel-categories/update-hotelcategories/${id}`,
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

export const deleteHotelCategory = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `http://localhost:8086/v1/hc/hotel-categories/delete-hotelcategories/${id}`,
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
