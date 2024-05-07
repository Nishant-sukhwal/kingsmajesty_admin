import axios from "axios";

export const getServices = async (formData) => {
    try {
        const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
        const response = await axios.post(
            "http://localhost:8086/v1/rc/roomcategory/create-roomcategory",
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
        console.error("Error creating facility:", error);
        throw error;
    }
};
