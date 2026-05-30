import { useState } from "react";

import Header from "../components/Header";

import { createReport } from "../services/reportService.js";

export default function ReportScam() {
  const [formData, setFormData] = useState({
    scamType: "",

    amountLost: "",

    description: "",

    contactEmail: "",
  });

  const [screenshots, setScreenshots] = useState([]);

  const [receipts, setReceipts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setSuccessMessage("");

    setErrorMessage("");

    try {
      const reportData = new FormData();

      reportData.append("scam_type", formData.scamType);

      reportData.append("amount_lost", formData.amountLost);

      reportData.append("description", formData.description);

      reportData.append("contact_email", formData.contactEmail);

      // MULTIPLE SCREENSHOTS
      for (let i = 0; i < screenshots.length; i++) {
        reportData.append("screenshots", screenshots[i]);
      }

      // MULTIPLE RECEIPTS
      for (let i = 0; i < receipts.length; i++) {
        reportData.append("receipt", receipts[i]);
      }

      await createReport(reportData);

      setSuccessMessage("Scam report submitted successfully.");

      setFormData({
        scamType: "",

        amountLost: "",

        description: "",

        contactEmail: "",
      });

      setScreenshots([]);

      setReceipts([]);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Submission failed");
    }

    setLoading(false);
  };

  return (
    <>
      <Header />

      <div
        className="
        min-h-screen
        bg-[#dfe9ff]
        py-10
        px-4
        md:px-8
      "
      >
        <div
          className="
          max-w-5xl
          mx-auto
          bg-white
          rounded-[35px]
          shadow-2xl
          p-6
          md:p-10
        "
        >
          {/* TITLE */}
          <div className="mb-8">
            <h1
              className="
              text-4xl
              md:text-5xl
              font-black
              text-[#111827]
            "
            >
              Report Scam
            </h1>

            <p className="mt-3 text-lg text-gray-500 ">
              Submit scam details for investigation and tracking.
            </p>
          </div>

          {/* SUCCESS */}
          {successMessage && (
            <div className="px-5 py-4 mb-6 text-green-700 bg-green-100 border border-green-300 rounded-2xl">
              {successMessage}
            </div>
          )}

          {/* ERROR */}
          {errorMessage && (
            <div className="px-5 py-4 mb-6 text-red-700 bg-red-100 border border-red-300 rounded-2xl">
              {errorMessage}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* SCAM TYPE */}
            <select
              value={formData.scamType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  scamType: e.target.value,
                })
              }
              required
              className="w-full px-5 py-4 border-2 border-indigo-200 outline-none rounded-2xl"
            >
              <option value="">Select Scam Type</option>

              <option value="Investment Scam">Investment Scam</option>

              <option value="Crypto Scam">Crypto Scam</option>

              <option value="Phishing">Phishing</option>

              <option value="Fake Job Offer">Fake Job Offer</option>

              <option value="Romance Scam">Romance Scam</option>

              <option value="Loan Scam">Loan Scam</option>

              <option value="Impersonation">Impersonation</option>

              <option value="Online Shopping Scam">Online Shopping Scam</option>
            </select>

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Contact Email"
              value={formData.contactEmail}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contactEmail: e.target.value,
                })
              }
              required
              className="w-full p-4 border border-gray-300 outline-none rounded-2xl"
            />

            {/* AMOUNT LOST */}
            <input
              type="number"
              placeholder="Amount Lost ($)"
              value={formData.amountLost}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amountLost: e.target.value,
                })
              }
              required
              className="w-full p-4 border border-gray-300 outline-none rounded-2xl"
            />

            {/* DESCRIPTION */}
            <textarea
              rows="7"
              placeholder="Describe what happened..."
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              required
              className="w-full p-5 border border-gray-300 outline-none resize-none rounded-2xl"
            />

            {/* FILES */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* SCREENSHOTS */}
              <div className="p-5 border border-gray-200 rounded-2xl">
                <label className="block mb-3 text-lg font-semibold">
                  Upload Screenshots
                </label>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setScreenshots(e.target.files)}
                  className="w-full"
                />

                <p className="mt-2 text-sm text-gray-500">
                  {screenshots.length} file(s) selected
                </p>
              </div>

              {/* RECEIPTS */}
              <div className="p-5 border border-gray-200 rounded-2xl">
                <label className="block mb-3 text-lg font-semibold">
                  Upload Receipt
                </label>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setReceipts(e.target.files)}
                  className="w-full"
                />

                <p className="mt-2 text-sm text-gray-500">
                  {receipts.length} file(s) selected
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 text-lg font-semibold text-white transition-all duration-300 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 rounded-2xl"
            >
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
