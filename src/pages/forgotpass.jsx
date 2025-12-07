import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../assets/Rumah Fantasi 2.png";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    if (!email.trim()) {
      setError("Please enter your email address.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset link");
      }
      setSuccessMessage("Reset link has been sent to your email!");

      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen overflow-hidden bg-[#F4EFEB] font-montserrat">
      {/* Image Section - Mobile First */}
      <div className="w-full lg:w-3/5 h-48 sm:h-64 md:h-80 lg:h-full order-1">
        <div className="w-full h-full overflow-hidden">
          <img
            src={loginBg}
            alt="Forgot Password Art"
            className="block w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-8 lg:py-0 gap-4 sm:gap-6 text-[#442D1D] relative order-2">
        {/* Back Button */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 text-base sm:text-lg lg:text-xl w-full flex justify-start">
          <Link
            to="/login"
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
            <span className="text-sm sm:text-base lg:text-lg font-medium">Back to Login</span>
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-1 sm:gap-2 mb-4 sm:mb-6 mt-10 sm:mt-12 lg:mt-20 w-full max-w-md items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#442D1D]">
            Forgot Password?
          </h1>
          <p className="text-base sm:text-lg text-[#442D1D] font-semibold opacity-80 max-w-sm">
            Enter your email to reset your password
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
              className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-full outline-none placeholder:text-[#9A8D83] transition-all duration-200 backdrop-blur-xl bg-[#442D1D]/25 border border-white/50 focus:ring-2 focus:ring-[#442D1D] focus:bg-transparent text-sm sm:text-base"
              placeholder="user@gmail.com"
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-xs sm:text-sm text-red-600 font-medium p-2 sm:p-3 rounded text-center bg-red-100 border border-red-200">
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="text-xs sm:text-sm text-green-700 font-medium p-2 sm:p-3 rounded text-center bg-green-100 border border-green-200">
              {successMessage}
              <p className="text-xs mt-1 text-green-600">
                Redirecting to login in 5 seconds...
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="py-2.5 sm:py-3 rounded-full font-medium text-base sm:text-lg shadow-md hover:scale-[1.02] transition w-full bg-[#442D1D] text-white mt-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          {/* Login Link */}
          <p className="text-xs sm:text-sm mt-3 sm:mt-4 text-center text-[#442D1D]">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-bold hover:underline text-[#442D1D]"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;