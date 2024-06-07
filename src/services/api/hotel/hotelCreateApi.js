import axios from "axios";

const getHotelsApi = async () => {
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const response = await axios.get("http://localhost:8086/v1/ht/hotel/hotels-list", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }
};

export default getHotelsApi;


export const getHotelByIdApi = async (id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      `http://localhost:8086/v1/ht/hotel/hotels-list/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hotel by ID:", error);
    throw error;
  }
};


//Create hotel api 
export const BasicInfoAddApi = async (formData) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.post(
      "http://localhost:8086/v1/ht/hotel/basicinfo/create-hotel",
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating facility:", error);
    throw error;
  }
};

export const AddLocationInfoApi = async (formData, id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.patch(
      `http://localhost:8086/v1/ht/hotel/locationinfo/create-hotel/${id}`,
      formData,
      // data,
      {
        headers: {
          'Content-Type': 'application/json',
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
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
  const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
  try {
    const data = new FormData()
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
      `http://localhost:8086/v1/ht/hotel/media/create-hotel/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
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

export const PropertyRulesAddApi = async (formData, id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.patch(
      `http://localhost:8086/v1/ht/hotel/propertyrulesinfo/create-hotel/${id}`,
      formData,
      // data,
      {
        headers: {
          'Content-Type': 'application/json',
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating facility:", error);
    throw error;
  }
};


export const FacilitiesAddApi = async (formData, id) => {
  console.log("FacilitiesAddApi formData09090909909090909090: ", formData, id);
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.patch(
      `http://localhost:8086/v1/ht/hotel/facilities/create-hotel/${id}`,
      formData,
      // data,
      {
        headers: {
          'Content-Type': 'application/json',
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating facility:", error);
    throw error;
  }
};

// Update APIs
export const BasicInfoUpdateApi = async (formData, id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.put(
      `http://localhost:8086/v1/ht/hotel/basicinfo/edit-hotel/${id}`,
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
    console.error("Error Update Basic Info:", error);
    throw error;
  }
};


export const LocationInfoUpdateApi = async (formData, id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.put(
      `http://localhost:8086/v1/ht/hotel/locationinfo/edit-hotel/${id}`,
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
    console.error("Error Update Basic Info:", error);
    throw error;
  }
};



export const MediaUpdateApi = async (formData, id) => {
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
    const response = await axios.put(
      `http://localhost:8086/v1/ht/hotel/media/edit-hotel/${id}`,
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

export const PropertyRulesUpdateApi = async (formData, id) => {
  console.log("formdata in submit when call PropertyRulesUpdateApi",formData)
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.put(
      `http://localhost:8086/v1/ht/hotel/propertyrulesinfo/edit-hotel/${id}`,
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
    console.error("Error Update Basic Info:", error);
    throw error;
  }
};

export const FacilitiesUpdateApi = async (formData, id) => {
  console.log(formData)
  try {
    // const formDataToSend = new FormData();
    // formDataToSend.append(JSON.stringify( formData.facilities)); 
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.put(
      `http://localhost:8086/v1/ht/hotel/facilities/edit-hotel/${id}`,
      formData.facilities,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error Update Basic Info:", error);
    throw error;
  }
};
