import api from "./api";


// CREATE REPORT
export const createReport = async (
  reportData
) => {

  const token =
    localStorage.getItem("token");

  const response = await api.post(
    "/reports",
    reportData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// GET REPORTS
export const getReports = async () => {

  const token =
    localStorage.getItem("token");

  const response = await api.get(
    "/reports",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// GET REPORT STATS
export const getReportStats =
  async () => {

    const token =
      localStorage.getItem("token");

    const response = await api.get(
      "/reports/stats",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };