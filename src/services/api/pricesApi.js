import axios from "axios";

// API function to fetch price types
export const getPricesApi = async () => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      "http://localhost:8086/v2/public/prices-list", // Endpoint for prices
      {
        headers: {
          "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Assuming you want to return the response data
  } catch (error) {
    console.error("Error fetching prices:", error);
    throw error;
  }
};