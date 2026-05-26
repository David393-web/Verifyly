import { useEffect, useState } from "react";

import Header from "../components/Header";
import Loader from "../components/Loader";

import {
  getReports,
} from "../services/reportService";


function SubmittedCases() {

  const [reports, setReports] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const fetchReports =
      async () => {

        try {

          const data =
            await getReports();

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

            <p className="text-gray-500">
              No reports submitted yet.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {reports.map((report) => (

              <div
                key={report._id}
                className="p-6 bg-white shadow rounded-2xl"
              >

                <h2 className="text-2xl font-bold text-indigo-600">
                  {report.scam_type}
                </h2>

                <p className="mt-3 text-gray-700">
                  {report.description}
                </p>

                <p className="mt-4 text-sm text-gray-500">
                  {report.contact_email}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {new Date(
                    report.createdAt
                  ).toLocaleString()}
                </p>

              </div>
            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default SubmittedCases;