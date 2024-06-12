// http://localhost:8086/v2/public/beds-list

import axios from "axios";

export const getBedsApi = async () => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      "http://localhost:8086/v2/public/beds-list", // Updated endpoint for beds
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Assuming you want to return the response data
  } catch (error) {
    console.error("Error fetching beds:", error);
    throw error;
  }
}
