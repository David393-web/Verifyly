import {
  ShieldAlert,
  Clock3,
  CheckCircle2,
  Activity,
  Search,
} from "lucide-react";

import { useEffect, useState, useCallback } from "react";

import Header from "../components/Header";
import BackButton from "../components/BackButton";

import { getAllReports, updateReportStatus } from "../services/adminService";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);

  const [search, setSearch] = useState("");

  // FETCH REPORTS
  const fetchReports = useCallback(async () => {
    try {
      const data = await getAllReports();

      setReports(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // LOAD REPORTS
  useEffect(() => {
    const loadData = async () => {
      await fetchReports();
    };

    loadData();
  }, [fetchReports]);

  // UPDATE STATUS
  const handleStatusUpdate = async (id, status) => {
    try {
      await updateReportStatus(id, status);

      fetchReports();
    } catch (error) {
      console.log(error);
    }
  };

  // FILTERED REPORTS
  const filteredReports = reports.filter(
    (report) =>
      report.scam_type?.toLowerCase().includes(search.toLowerCase()) ||
      report.user?.full_name?.toLowerCase().includes(search.toLowerCase()),
  );

  // STATS
  const totalReports = reports.length;

  const pendingReports = reports.filter(
    (report) => report.status === "Pending",
  ).length;

  const resolvedReports = reports.filter(
    (report) => report.status === "Resolved",
  ).length;

  const activeReports = reports.filter(
    (report) => report.status === "Investigating",
  ).length;

  // LOADING
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <h1 className="text-2xl font-bold ">Loading Dashboard...</h1>
      </div>
    );
  }

  return (
    <>
      <Header />
      <BackButton />

      <div
        className="
        min-h-screen
        bg-[#f5f7fb]
        p-6
      "
      >
        {/* HEADER */}
        <div className="flex flex-col gap-4 mb-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-900 ">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-500 ">
              Monitor scam reports and investigations
            </p>
          </div>

          {/* SEARCH */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white shadow-md rounded-2xl">
            <Search size={20} className="text-gray-400 " />

            <input
              type="text"
              placeholder="
                Search reports...
              "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none "
            />
          </div>
        </div>

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* TOTAL */}
          <div className="p-6 bg-white shadow-lg rounded-3xl">
            <div className="flex items-center justify-between ">
              <div>
                <p className="text-sm text-gray-500 ">Total Reports</p>

                <h2 className="mt-2 text-4xl font-black ">{totalReports}</h2>
              </div>

              <div className="p-4 bg-red-100 rounded-2xl">
                <ShieldAlert size={35} className="text-red-500 " />
              </div>
            </div>
          </div>

          {/* PENDING */}
          <div className="p-6 bg-white shadow-lg rounded-3xl">
            <div className="flex items-center justify-between ">
              <div>
                <p className="text-sm text-gray-500 ">Pending</p>

                <h2 className="mt-2 text-4xl font-black ">{pendingReports}</h2>
              </div>

              <div className="p-4 bg-yellow-100 rounded-2xl">
                <Clock3 size={35} className="text-yellow-500 " />
              </div>
            </div>
          </div>

          {/* RESOLVED */}
          <div className="p-6 bg-white shadow-lg rounded-3xl">
            <div className="flex items-center justify-between ">
              <div>
                <p className="text-sm text-gray-500 ">Resolved</p>

                <h2 className="mt-2 text-4xl font-black ">{resolvedReports}</h2>
              </div>

              <div className="p-4 bg-green-100 rounded-2xl">
                <CheckCircle2 size={35} className="text-green-500 " />
              </div>
            </div>
          </div>

          {/* ACTIVE */}
          <div className="p-6 bg-white shadow-lg rounded-3xl">
            <div className="flex items-center justify-between ">
              <div>
                <p className="text-sm text-gray-500 ">Active Cases</p>

                <h2 className="mt-2 text-4xl font-black ">{activeReports}</h2>
              </div>

              <div className="p-4 bg-indigo-100 rounded-2xl">
                <Activity size={35} className="text-indigo-500 " />
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-10 overflow-hidden bg-white shadow-lg rounded-3xl">
          <div className="p-6 border-b ">
            <h2 className="text-2xl font-bold ">Investigation Reports</h2>
          </div>

          <div className="overflow-x-auto ">
            <table className="w-full ">
              <thead className=" bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">User</th>

                  <th className="px-6 py-4 text-left">Scam Type</th>

                  <th className="px-6 py-4 text-left">Status</th>

                  <th className="px-6 py-4 text-left">Evidence</th>

                  <th className="px-6 py-4 text-left">Date</th>

                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report._id} className="border-b ">
                    {/* USER */}
                    <td className="px-6 py-5 ">{report.user?.full_name}</td>

                    {/* TYPE */}
                    <td className="px-6 py-5 ">{report.scam_type}</td>

                    {/* STATUS */}
                    <td className="px-6 py-5 ">
                      <span
                        className={`
                            px-4
                            py-2
                            text-sm
                            rounded-full

                            ${
                              report.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : report.status === "Resolved"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-indigo-100 text-indigo-700"
                            }
                          `}
                      >
                        {report.status}
                      </span>
                    </td>

                    {/* EVIDENCE */}
                    <td className="px-6 py-5 ">
                      <div className="flex gap-2 ">
                        {report.screenshots && (
                          <button
                            onClick={() => setSelectedImage(report.screenshots)}
                            className="px-4 py-2 text-sm text-indigo-700 bg-indigo-100 rounded-xl"
                          >
                            Screenshot
                          </button>
                        )}

                        {report.receipt && (
                          <button
                            onClick={() => setSelectedImage(report.receipt)}
                            className="px-4 py-2 text-sm text-green-700 bg-green-100 rounded-xl"
                          >
                            Receipt
                          </button>
                        )}
                      </div>
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-5 ">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-5 ">
                      <div className="flex flex-wrap gap-2 ">
                        <button
                          onClick={() =>
                            handleStatusUpdate(report._id, "Pending")
                          }
                          className="px-3 py-2 text-sm text-yellow-700 bg-yellow-100 rounded-xl"
                        >
                          Pending
                        </button>

                        <button
                          onClick={() =>
                            handleStatusUpdate(report._id, "Investigating")
                          }
                          className="px-3 py-2 text-sm text-indigo-700 bg-indigo-100 rounded-xl"
                        >
                          Investigating
                        </button>

                        <button
                          onClick={() =>
                            handleStatusUpdate(report._id, "Resolved")
                          }
                          className="px-3 py-2 text-sm text-green-700 bg-green-100 rounded-xl"
                        >
                          Resolve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* IMAGE MODAL */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80">
            <div className="relative w-full max-w-5xl ">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute z-50 px-4 py-2 text-white bg-red-500 top-4 right-4 rounded-xl"
              >
                Close
              </button>

              <img
                src={selectedImage}
                alt="Evidence"
                className="
                  object-contain
                  w-full
                  max-h-[90vh]
                  rounded-3xl
                "
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
