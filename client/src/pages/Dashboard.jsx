import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Header from "../components/Header";

import Loader from "../components/Loader";

import {
  ShieldAlert,
  FileSearch,
  Settings,
  Activity,
  Clock3,
  SearchCheck,
  BadgeCheck,
} from "lucide-react";

import {
  getReportStats,
} from "../services/reportService";

export default function Dashboard() {

  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const [stats, setStats] =
    useState({
      totalReports: 0,
      pendingReports: 0,
      investigatingReports: 0,
      resolvedReports: 0,
      latestReport: null,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const data =
            await getReportStats();

          setStats(data);

        } catch (error) {

          console.log(error);

        } finally {

          // VERY FAST LOADING
          setTimeout(() => {
            setLoading(false);
          }, 300);

        }
      };

    fetchStats();

  }, []);


  // LOADER
  if (loading) {
    return (
      <>
        <Header />
        <Loader />
      </>
    );
  }


  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#eef2ff] py-10 px-4 md:px-8">

        <div className="mx-auto max-w-7xl">

          {/* WELCOME */}
          <div className="mb-10">

            <h1 className="text-4xl font-black text-gray-900 md:text-5xl">
              Hi,{" "}
              {user?.full_name ||
                "User"} 👋
            </h1>

            <p className="mt-3 text-lg text-gray-500">
              Welcome back to
              Verilyfy Scam Protection
              System
            </p>

          </div>


          {/* STATS */}
          <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2 xl:grid-cols-4">

            {/* TOTAL */}
            <div className="bg-white p-6 rounded-[30px] shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    Total Reports
                  </p>

                  <h2 className="mt-3 text-4xl font-black text-indigo-600">
                    {stats.totalReports}
                  </h2>

                </div>

                <Activity className="text-indigo-500 w-14 h-14" />

              </div>

            </div>


            {/* PENDING */}
            <div className="bg-white p-6 rounded-[30px] shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    Pending
                  </p>

                  <h2 className="mt-3 text-4xl font-black text-yellow-500">
                    {stats.pendingReports}
                  </h2>

                </div>

                <Clock3 className="text-yellow-500 w-14 h-14" />

              </div>

            </div>


            {/* INVESTIGATING */}
            <div className="bg-white p-6 rounded-[30px] shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    Investigating
                  </p>

                  <h2 className="mt-3 text-4xl font-black text-blue-500">
                    {stats.investigatingReports}
                  </h2>

                </div>

                <SearchCheck className="text-blue-500 w-14 h-14" />

              </div>

            </div>


            {/* RESOLVED */}
            <div className="bg-white p-6 rounded-[30px] shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-gray-500">
                    Resolved
                  </p>

                  <h2 className="mt-3 text-4xl font-black text-green-500">
                    {stats.resolvedReports}
                  </h2>

                </div>

                <BadgeCheck className="text-green-500 w-14 h-14" />

              </div>

            </div>

          </div>


          {/* LATEST REPORT */}
          <div className="p-6 mb-10 bg-white shadow-lg rounded-[30px]">

            <p className="text-gray-500">
              Latest Report
            </p>

            <h2 className="mt-3 text-3xl font-black text-gray-900">

              {stats.latestReport
                ? stats.latestReport
                    .scam_type
                : "No Reports Yet"}

            </h2>

            {stats.latestReport && (

              <div className="mt-4">

                <span
                  className={`
                    px-4 py-2 rounded-full text-sm font-semibold

                    ${
                      stats.latestReport
                        .status ===
                      "Pending"
                        ? "bg-yellow-100 text-yellow-700"

                        : stats
                            .latestReport
                            .status ===
                          "Investigating"
                        ? "bg-blue-100 text-blue-700"

                        : "bg-green-100 text-green-700"
                    }
                  `}
                >
                  {
                    stats.latestReport
                      .status
                  }
                </span>

              </div>

            )}

          </div>


          {/* ACTION CARDS */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* REPORT */}
            <button
              onClick={() =>
                navigate(
                  "/report-scam"
                )
              }
              className="
                bg-white
                p-8
                rounded-[30px]
                shadow-lg
                hover:shadow-2xl
                transition-all
                duration-300
                text-left
                hover:-translate-y-1
              "
            >

              <ShieldAlert className="mb-5 text-red-500 w-14 h-14" />

              <h2 className="mb-3 text-2xl font-bold text-gray-900">
                Report Scam
              </h2>

              <p className="leading-relaxed text-gray-500">
                Submit scam evidence
                and details for
                investigation.
              </p>

            </button>


            {/* CASES */}
            <button
              onClick={() =>
                navigate(
                  "/submitted-cases"
                )
              }
              className="
                bg-white
                p-8
                rounded-[30px]
                shadow-lg
                hover:shadow-2xl
                transition-all
                duration-300
                text-left
                hover:-translate-y-1
              "
            >

              <FileSearch className="mb-5 text-blue-500 w-14 h-14" />

              <h2 className="mb-3 text-2xl font-bold text-gray-900">
                Submitted Cases
              </h2>

              <p className="leading-relaxed text-gray-500">
                Track all submitted
                scam reports.
              </p>

            </button>


            {/* SETTINGS */}
            <button
              onClick={() =>
                navigate(
                  "/settings"
                )
              }
              className="
                bg-white
                p-8
                rounded-[30px]
                shadow-lg
                hover:shadow-2xl
                transition-all
                duration-300
                text-left
                hover:-translate-y-1
              "
            >

              <Settings className="mb-5 text-purple-500 w-14 h-14" />

              <h2 className="mb-3 text-2xl font-bold text-gray-900">
                Settings
              </h2>

              <p className="leading-relaxed text-gray-500">
                Manage account
                preferences and profile.
              </p>

            </button>

          </div>

        </div>

      </div>
    </>
  );
}