import { useEffect, useState } from "react";

import Header from "../components/Header";
import Loader from "../components/Loader";

import { getReports } from "../services/reportService";

function SubmittedCases() {
  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports();

        setReports(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-[#dfe9ff]">
      <Header />

      <div className="max-w-5xl px-6 py-10 mx-auto">
        <h1 className="mb-8 text-5xl font-bold text-gray-900">
          Submitted Cases
        </h1>

        {loading ? (
          <Loader />
        ) : reports.length === 0 ? (
          <div className="p-6 bg-white shadow rounded-2xl">
            <p className="text-gray-500">No reports submitted yet.</p>
          </div>
        ) : (
          <div className="relative pl-8 space-y-8 border-l-4 border-indigo-500">
            {reports.map((report) => (
              <div key={report._id} className="relative">
                <div className="absolute w-5 h-5 bg-indigo-600 rounded-full -left-[42px] top-1"></div>

                <div className="p-6 bg-white shadow rounded-2xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-indigo-600">
                      {report.scam_type}
                    </h2>

                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        report.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : report.status === "Investigating"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>

                  <p className="mt-4 text-gray-700">{report.description}</p>

                  <div className="mt-5 space-y-2 text-sm text-gray-500">
                    <p>Contact Email: {report.contact_email}</p>

                    <p>
                      Submitted: {new Date(report.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SubmittedCases;
