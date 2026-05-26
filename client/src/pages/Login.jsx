import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import {
  loginUser,
} from "../services/authService";


function Login() {

  const navigate =
    useNavigate();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] = useState({

    email: "",
    password: "",

  });


  // HANDLE INPUT
  const handleChange = (
    e
  ) => {

    setFormData((prev) => ({

      ...prev,

      [e.target.name]:
        e.target.value,

    }));

  };


  // HANDLE LOGIN
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        const data =
          await loginUser(
            formData
          );

        // SAVE TOKEN
        localStorage.setItem(
          "token",
          data.token
        );

        // SAVE USER
        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );

        toast.success(
          "Login successful"
        );

        // ADMIN CHECK
        if (
          data.user.role ===
          "admin"
        ) {

          navigate("/admin");

        } else {

          navigate(
            "/dashboard"
          );

        }

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Login failed"

        );

      } finally {

        setLoading(false);

      }

    };


  return (

    <div className="
      min-h-screen
      bg-[#dfe9ff]
      flex
      items-center
      justify-center
      px-6
    ">

      <div className="w-full max-w-md p-8 bg-white shadow-2xl  rounded-3xl">

        {/* TITLE */}
        <div className="mb-8 text-center ">

          <h1 className="text-5xl font-bold text-indigo-600 ">
            Verilyfy
          </h1>

          <p className="mt-3 text-gray-500 ">
            Login to your account
          </p>

        </div>


        {/* FORM */}
        <form
          onSubmit={
            handleSubmit
          }

          className="space-y-5 "
        >

          {/* EMAIL */}
          <div>

            <label className="block mb-2 font-medium text-gray-700 ">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
              className="w-full p-4 border border-gray-300 outline-none  rounded-2xl focus:ring-2 focus:ring-indigo-400"
            />

          </div>


          {/* PASSWORD */}
          <div>

            <label className="block mb-2 font-medium text-gray-700 ">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                name="password"

                placeholder="Enter password"

                value={
                  formData.password
                }

                onChange={
                  handleChange
                }

                required

                className="w-full p-4 border border-gray-300 outline-none  pr-14 rounded-2xl focus:ring-2 focus:ring-indigo-400"
              />

              <button
                type="button"

                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }

                className="absolute text-gray-500 -translate-y-1/2  top-1/2 right-4"
              >

                {showPassword ? (

                  <EyeOff
                    size={22}
                  />

                ) : (

                  <Eye
                    size={22}
                  />

                )}

              </button>

            </div>

          </div>


          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 text-lg font-semibold text-white transition-all duration-300 bg-indigo-600  rounded-2xl hover:bg-indigo-700 disabled:bg-indigo-400"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>


        {/* REGISTER */}
        <p className="mt-6 text-center text-gray-500 ">

          Don’t have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-indigo-600  hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;