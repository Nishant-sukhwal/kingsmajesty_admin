import axios from "axios";

export const saveRoomCategoryApi = async (formData) => {
    console.log("formdata in saveRoomCategoryApi",formData)
    try {
    //   const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    //   const data = new FormData();
    //   data.append("facilityName", formData.name);
    //   data.append("image", formData.media);
      const response = await axios.post(
        "http://localhost:8086/v1/rc/roomcategory/create-roomcategory",
        formData,
        // data,
        {
          headers: {
            'Content-Type': 'application/json',
            // "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating facility:", error);
      throw error;
    }
  }; 

  export const getRoomCategoryApi = async () => {
    try {
    //   const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    //   const data = new FormData();
    //   data.append("facilityName", formData.name);
    //   data.append("image", formData.media);
      const response = await axios.get(
        "http://localhost:8086/v1/rm/roomcategory/get-roomcategory",
        //formData,
        // data,
        {
          headers: {
            'Content-Type': 'application/json',
            // "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating facility:", error);
      throw error;
    }
  };