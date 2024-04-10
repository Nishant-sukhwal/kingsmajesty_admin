import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

export const fetchHotelsDropdownListApi = async () => {
  try {
    // const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      "http://localhost:8086/v1/ht/hotels/get-hotels",
      {
        headers: {
          "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
    
  } catch (error) {
    
    console.error("Error creating  facility :", error);
    throw error;
  }
};


export const addRoomApi = async (formData) => {
  try {
    // const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const formDataToSend = new FormData();
      // Append thumbnail
      formDataToSend.append("thumbnail", formData.thumbnail);
      // Append gallery files
      formData.gallery.forEach((file, index) => {
        formDataToSend.append(`gallery`, file);
      });
      //other fields
      formDataToSend.append("hotel", formData.hotel);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("min_people", formData.min_people);
      formDataToSend.append("max_adults", formData.max_adults);
      formDataToSend.append("base_Price", formData.base_Price);
      formDataToSend.append("todays_price", formData.todays_price);
      formDataToSend.append("max_children", formData.max_children);
      formDataToSend.append("rooms_stock", formData.rooms_stock);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("facilities", JSON.stringify(formData.facilities)); // Assuming facilities is an array, stringify it
      formDataToSend.append("deals", JSON.stringify(formData.deals));

    const response = await axios.post(
      "http://localhost:8086/v1/rm/rooms/add-room",
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        //   Authorization: `Bearer ${token}`,
        },
      }
    );
    toastr.success(response.data.message);
    return response.data;
  } catch (error) {
    toastr.error(error.message);
    console.error("Error creating  Room :", error);
    throw error;
  }
};


export const getRoomByIdApi = async (id) => {
  console.log(id);
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      `http://localhost:8086/v1/rm/rooms/get-rooms/${id}`,
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