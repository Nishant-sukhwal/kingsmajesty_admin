import axios from "axios";

export const BasicInfoAddApi = async (formData) => {
    console.log(formData);
    try {
    //   const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    //   const data = new FormData();
    //   data.append("facilityName", formData.name);
    //   data.append("image", formData.media);
      const response = await axios.post(
        "http://localhost:8086/v1/ht/hotels/add-basicinfo",
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

  export const AddLocationInfoApi = async (formData,id) => {
    console.log("AddLocationInfoApi formData: ",formData, id);
    try {
      // const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
      const response = await axios.patch(
        `http://localhost:8086/v1/ht/hotels/add-locationinfo/${id}`,
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


  

  export const MediaAddApi = async (formData, id) => {
    console.log("MediaAddApi formData: ", formData);
  
    try {
      const data = new FormData();
  
      // Append thumbnail
      data.append("thumbnail", formData.get("thumbnail"));
  
      // Append gallery files
      for (let [key, value] of formData.entries()) {
        // Check if the key starts with 'gallery_'
        if (key.startsWith("gallery_")) {
          data.append("gallery", value);
        }
      }
     
      

      const response = await axios.patch(
        `http://localhost:8086/v1/ht/hotels/add-media/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Add any other headers if needed (e.g., Authorization)
          },
        }
      );
  
      return response;
    } catch (error) {
      console.error("Error adding media:", error);
      throw error;
    }
  };
  