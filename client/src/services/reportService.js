import api from "./api";

// CREATE REPORT
export const createReport = async (
  reportData
) => {

  const response = await api.post(
    "/reports",
    reportData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

// GET REPORTS
export const getReports = async () => {

  const response =
    await api.get(
      "/reports"
    );

  return response.data;
};

// GET REPORT STATS
export const getReportStats =
  async () => {

    const response =
      await api.get(
        "/reports/stats"
      );

    return response.data;
  };