import { useState } from "react";
import Header from "../components/Header";

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

      <div className="min-h-screen bg-[#eef2ff] py-10 px-4 md:px-8">
        
        <div className="bg-white max-w-3xl mx-auto rounded-[35px] shadow-2xl p-6 md:p-10">
          
          {/* TITLE */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900">
              Settings
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Manage your account preferences.
            </p>
          </div>

          {/* SUCCESS MESSAGE */}
          {successMessage && (
            <div className="bg-green-100 border border-green-300 text-green-700 px-5 py-4 rounded-2xl mb-6">
              {successMessage}
            </div>
          )}

          {/* FORM */}
          <div className="space-y-6">
            
            {/* FULL NAME */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="
                  w-full
                  p-4
                  rounded-2xl
                  border
                  border-gray-300
                  outline-none
                  focus:ring-2
                  focus:ring-indigo-400
                "
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                  w-full
                  p-4
                  rounded-2xl
                  border
                  border-gray-300
                  outline-none
                  focus:ring-2
                  focus:ring-indigo-400
                "
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                New Password
              </label>

              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="
                  w-full
                  p-4
                  rounded-2xl
                  border
                  border-gray-300
                  outline-none
                  focus:ring-2
                  focus:ring-indigo-400
                "
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSave}
              className="
                w-full
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-8
                py-4
                rounded-2xl
                font-semibold
                text-lg
                transition-all
                duration-300
              "
            >
              Save Changes
            </button>

          </div>
        </div>
      </div>
    </>
  );
}