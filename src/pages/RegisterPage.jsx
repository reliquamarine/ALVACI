import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from '../components/ToastWithProgress';
import registerBg from "../assets/Rumah Fantasi 2.png";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("All fields must be filled in");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to Register");

      toastSuccess("Register success! Please login.");
      navigate("/login");
    } catch (err) {
      toastError(err.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen font-montserrat bg-[#F4EFEB]">
      {/* Form Section - Mobile First */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-8 lg:py-0 gap-4 sm:gap-6 relative text-[#442D1D] order-2 lg:order-1">
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
        <div className="flex flex-col gap-1 sm:gap-2 mb-2 sm:mb-4 mt-8 sm:mt-10 w-full max-w-md items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Create an account</h1>
          <p className="text-xs sm:text-sm font-medium">
            Already have an account?{" "}
            <Link to="/login" className="font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="w-full max-w-md flex flex-col gap-3 sm:gap-4">
          {/* Username */}
          <div className="flex flex-col gap-1">
            <label className="text-sm sm:text-base font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-full outline-none placeholder:text-[#9A8D83] transition-all duration-200 
               backdrop-blur-lg bg-[#442D1D]/20 border border-white/60 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent text-sm sm:text-base"
              placeholder="LoremKece25"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm sm:text-base font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-full outline-none placeholder:text-[#9A8D83] transition-all duration-200 
               backdrop-blur-lg bg-[#442D1D]/20 border border-white/60 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent text-sm sm:text-base"
              placeholder="user@gmail.com"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm sm:text-base font-semibold">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-full outline-none placeholder:text-[#9A8D83] transition-all duration-200 
                 backdrop-blur-lg bg-[#442D1D]/20 border border-white/60 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent text-sm sm:text-base pr-10 sm:pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 sm:right-5 flex items-center text-[#442D1D] cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current"
                >
                  {showPassword ? (
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
                </svg>
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm sm:text-base font-semibold">Confirm Password</label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-full outline-none placeholder:text-[#9A8D83] transition-all duration-200 
                 backdrop-blur-lg bg-[#442D1D]/20 border border-white/60 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent text-sm sm:text-base pr-10 sm:pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 sm:right-5 flex items-center text-[#442D1D] cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current"
                >
                  {showConfirmPassword ? (
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
                </svg>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="text-xs sm:text-sm text-red-600 font-medium p-2 rounded text-center"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="py-2.5 sm:py-3 rounded-full font-medium text-base sm:text-lg shadow-md hover:scale-[1.02] transition w-full text-white bg-[#442D1D] cursor-pointer mt-2"
          >
            Create an account
          </button>
        </form>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-3/5 h-48 sm:h-64 md:h-80 lg:h-full order-1 lg:order-2">
        <div className="w-full h-full overflow-hidden">
          <img
            src={registerBg}
            alt="Register Side Art"
            className="block w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;