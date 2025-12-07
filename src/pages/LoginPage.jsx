import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from '../components/ToastWithProgress';
import loginBg from "../assets/Rumah Fantasi 2.png";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password must be filled in");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      localStorage.setItem("token", data.token); // simpen token
      toastSuccess("Login success!");
      navigate("/beranda");
    } catch (err) {
      toastError(err.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen overflow-hidden bg-[#F4EFEB] font-montserrat">
      {/* Image Section - Mobile First */}
      <div className="w-full lg:w-3/5 h-48 sm:h-64 md:h-80 lg:h-full order-1">
        <div className="w-full h-full overflow-hidden">
          <img
            src={loginBg}
            alt="Login Side Art"
            className="block w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-8 lg:py-0 gap-4 sm:gap-6 text-[#442D1D] relative order-2">
        {/* Back Button */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 text-base sm:text-lg lg:text-xl w-full flex justify-start">
          <Link
            to="/"
            className="flex items-center gap-1 hover:opacity-75 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-4 sm:w-6 sm:h-5 stroke-current"
            >
              <path
                d="M15.75 19.5 8.25 12l7.5-7.5"
                fill="none"
                strokeWidth="3.0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm sm:text-base lg:text-lg font-medium">Back</span>
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-1 sm:gap-2 mb-4 sm:mb-6 mt-10 sm:mt-12 lg:mt-20 w-full max-w-md items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#442D1D]">
            Welcome to Artzy
          </h1>
          <p className="text-base sm:text-lg text-[#442D1D] font-semibold">
            Log into your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4 sm:gap-5">
          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm sm:text-base lg:text-lg text-[#442D1D] font-semibold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-full outline-none placeholder:text-[#9A8D83] transition-all duration-200 
               backdrop-blur-XL bg-[#442D1D]/25 border border-white/50 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent text-sm sm:text-base"
              placeholder="user@gmail.com"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm sm:text-base lg:text-lg text-[#442D1D] font-semibold">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-full outline-none placeholder:text-[#9A8D83] transition-all duration-200 
                 backdrop-blur-XL bg-[#442D1D]/25 border border-white/50 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent text-sm sm:text-base pr-10 sm:pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 sm:right-5 flex items-center text-[#442D1D] cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
              >
                {showPassword ? (
                  // Mata terbuka → ketutup (ada garis slash)
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M2.25 12s2.25-6 9.75-6 9.75 6 9.75 6-2.25 6-9.75 6-9.75-6-9.75-6z" />
                    <path d="M2.25 2.25l19.5 19.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  // Mata tertutup → terbuka
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M2.25 12s2.25-6 9.75-6 9.75 6 9.75 6-2.25 6-9.75 6-9.75-6-9.75-6z" />
                    <circle cx="12" cy="12" r="2.25" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="self-start text-xs sm:text-sm hover:underline text-[#442D1D] font-medium cursor-pointer mt-1"
          >
            Forgot Password
          </button>

          {/* Error Message */}
          {error && (
            <div
              className="text-xs sm:text-sm text-red-600 font-medium p-2 rounded text-center"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="py-2.5 sm:py-3 rounded-full font-medium text-base sm:text-lg shadow-md hover:scale-[1.02] transition w-full bg-[#442D1D] text-white cursor-pointer mt-2"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-xs sm:text-sm mt-3 text-center text-[#442D1D]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold hover:underline text-[#442D1D]"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;