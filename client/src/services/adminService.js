import axios from "axios";

const API =
   "https://verifly-server.onrender.com/api/admin";


// GET REPORTS
export const getAllReports =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.get(

        `${API}/reports`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );

    return response.data;

  };


// UPDATE STATUS
export const updateReportStatus =
  async (
    id,
    status
  ) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.put(

        `${API}/reports/${id}`,

        {
          status,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

      );

    return response.data;

  };