import axios from "axios";

export const getRoleApi = async () => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      "http://localhost:8086/v1/rl/roles/get-roles",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Assuming you want to return the response data
  } catch (error) {
    console.error("Error fetching role:", error);
    throw error;
  }
};


export const createTeamMemberAPI = async (formData) => {
  console.log("formData sending ------------------> ", formData)
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.post(
      "http://localhost:8086/v1/tm/team/create-team-member",
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
    console.error("Error creating Team Member:", error);
    throw error;
  }
};

export const getTeamMembersAPI = async () => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      "http://localhost:8086/v1/tm/team/team-member-list",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error getting Team Member", error);
    throw error;
  }
};

export const getTeamMembersByIdAPI = async (id) => {
  console.log(id);
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.get(
      `http://localhost:8086/v1/tm/team/team-member-list/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response;
  } catch (error) {
    console.error("Error getting Team Member by id", error);
    throw error;
  }
};

export const teamMembersUpdateApi = async (formData, id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    // const data = new FormData();
    // data.append("name", formData.name);
    const response = await axios.patch(
      `http://localhost:8086/v1/tm/team/edit-team-member/${id}`,
      formData,
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
    console.error("Error updating room category:", error);
    throw error;
  }
};





export const deleteTeamMembersAPI = async (id) => {
  try {
    const token = localStorage.getItem("token").replace(/^"(.*)"$/, "$1");
    const response = await axios.delete(
      `http://localhost:8086/v1/tm/team/delete-team-member/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting Team Member:", error);
    throw error;
  }
};