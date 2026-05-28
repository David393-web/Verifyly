import { useState, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

import { Eye, EyeOff } from "lucide-react";

import { AuthContext } from "../context/AuthContext";

import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const { setToken } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // HANDLE REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await registerUser({
        full_name: formData.full_name,

        email: formData.email,

        password: formData.password,
      });

      // SAVE TOKEN
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      // SAVE USER
      if (data?.user) {
        localStorage.setItem(
          "user",

          JSON.stringify(data.user),
        );
      }
      setToken(data.token);

      toast.success("Account created successfully");

      // ADMIN REDIRECT
      if (data?.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-[#dfe9ff]
      flex
      items-center
      justify-center
      p-6
    "
    >
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl">
        {/* TITLE */}
        <div className="mb-8 text-center ">
          <h1 className="text-5xl font-black text-indigo-600 ">Verilyfy</h1>

          <p className="mt-3 text-gray-500 ">Create your account</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5 ">
          {/* FULL NAME */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 ">
              Full Name
            </label>

            <input
              type="text"
              name="full_name"
              placeholder="Enter full name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 outline-none rounded-2xl focus:border-indigo-500"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 ">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 outline-none rounded-2xl focus:border-indigo-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 ">
              Password
            </label>

            <div className="relative ">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 outline-none pr-14 rounded-2xl focus:border-indigo-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-500 -translate-y-1/2 top-1/2 right-4"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 text-lg font-semibold text-white transition bg-indigo-600 rounded-2xl hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* LOGIN */}
        <p className="mt-6 text-center text-gray-600 ">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
