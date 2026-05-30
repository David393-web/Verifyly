import { useState } from "react";
import Header from "../components/Header";
import BackButton from "../components/BackButton";

const savedUser =
  JSON.parse(localStorage.getItem("user")) || {};

export default function Settings() {
  const [name, setName] = useState(
    savedUser.full_name || ""
  );

  const [email, setEmail] = useState(
    savedUser.email || ""
  );

  const [password, setPassword] = useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleSave = () => {
    const updatedUser = {
      ...savedUser,
      full_name: name,
      email,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setSuccessMessage(
      "Settings updated successfully!"
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <>
      <Header />

      <BackButton />

      <div className="min-h-screen bg-[#eef2ff] py-10 px-4 md:px-8">
        
        <div className="bg-white max-w-3xl mx-auto rounded-[35px] shadow-2xl p-6 md:p-10">
          
          {/* TITLE */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 md:text-5xl">
              Settings
            </h1>

            <p className="mt-3 text-lg text-gray-500">
              Manage your account preferences.
            </p>
          </div>

          {/* SUCCESS MESSAGE */}
          {successMessage && (
            <div className="px-5 py-4 mb-6 text-green-700 bg-green-100 border border-green-300 rounded-2xl">
              {successMessage}
            </div>
          )}

          {/* FORM */}
          <div className="space-y-6">
            
            {/* FULL NAME */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full p-4 border border-gray-300 outline-none  rounded-2xl focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full p-4 border border-gray-300 outline-none  rounded-2xl focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                New Password
              </label>

              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full p-4 border border-gray-300 outline-none  rounded-2xl focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSave}
              className="w-full px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-indigo-600  hover:bg-indigo-700 rounded-2xl"
            >
              Save Changes
            </button>

          </div>
        </div>
      </div>
    </>
  );
}