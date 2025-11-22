import React, { useState } from "react";
import { Link } from "react-router-dom";
import registerBg from "../assets/Rumah Fantasi 1.svg";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-[#F5EEE9]">
      {/* Left register form */}
      <div className="w-2/5 flex flex-col justify-center items-start px-24 gap-8">
        <div className="mb-6 text-2xl text-[#4A2E1E]">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-[#6b3b22] transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 stroke-current"
            >
              <path
                d="M15.75 19.5 8.25 12l7.5-7.5"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-base">Back</span>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-extrabold text-[#4A2E1E] leading-tight">
            Create an account
          </h1>
          <p className="text-sm text-[#4A2E1E]">
            Already have an account ?{' '}
            <Link to="/login" className="font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <div className="w-full flex flex-col gap-4 mt-4 max-w-md">
          <div className="flex flex-col gap-2">
            <label className="text-[#4A2E1E] font-semibold">Username</label>
            <input
              type="text"
              className="w-full bg-[#D8CCC4] px-4 py-3 rounded-full outline-none placeholder:text- border-2 border-transparent transition-all duration-200 hover:shadow-lg hover:bg-[#D8CCC4] focus:border-[#4A2E1E] focus:bg-[#D8CCC4] focus:shadow-lg"
              placeholder="username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#4A2E1E] font-semibold">Email</label>
            <input
              type="email"
              className="w-full bg-[#D8CCC4] px-4 py-3 rounded-full outline-none placeholder:text-[#9A8D83] border-2 border-transparent transition-all duration-200 hover:shadow-lg hover:bg-[#D8CCC4] focus:border-[#4A2E1E] focus:bg-[#D8CCC4] focus:shadow-lg"
              placeholder="example@gmail.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#4A2E1E] font-semibold">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-[#D8CCC4] px-4 py-3 pr-11 rounded-full outline-none placeholder:text-[#9A8D83] border-2 border-transparent transition-all duration-200 hover:shadow-lg hover:bg-[#D8CCC4] focus:border-[#4A2E1E] focus:bg-[#D8CCC4] focus:shadow-lg"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-[#4A2E1E]/80 hover:text-[#4A2E1E] cursor-pointer"
              >
                <span className="sr-only">Toggle password visibility</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-none stroke-current"
                >
                  <path
                    d="M2.25 12s2.25-6 9.75-6 9.75 6 9.75 6-2.25 6-9.75 6-9.75-6-9.75-6z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 9.75A2.25 2.25 0 1 0 12 14.25 2.25 2.25 0 0 0 12 9.75z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#4A2E1E] font-semibold">
              Confirm Password
            </label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full bg-[#D8CCC4] px-4 py-3 pr-11 rounded-full outline-none placeholder:text-[#9A8D83] border-2 border-transparent transition-all duration-200 hover:shadow-lg hover:bg-[#D8CCC4] focus:border-[#4A2E1E] focus:bg-[#D8CCC4] focus:shadow-lg"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-[#4A2E1E]/80 hover:text-[#4A2E1E] cursor-pointer"
              >
                <span className="sr-only">
                  Toggle confirm password visibility
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-none stroke-current"
                >
                  <path
                    d="M2.25 12s2.25-6 9.75-6 9.75 6 9.75 6-2.25 6-9.75 6-9.75-6-9.75-6z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 9.75A2.25 2.25 0 1 0 12 14.25 2.25 2.25 0 0 0 12 9.75z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <Link to="/login">
            <button className="mt-2 bg-[#4A2E1E] text-white py-3 rounded-full font-bold text-lg shadow-md hover:scale-105 transition cursor-pointer w-full">
              Create an account
            </button>
          </Link>
        </div>
      </div>

      {/* Right image */}
      <div className="w-3/5 h-full flex items-center justify-center pr-10">
        <div className="w-11/12 rounded-3xl shadow-xl overflow-hidden bg-[#F5EEE9]">
          <img
            src={registerBg}
            alt="Register Side Art"
            className="block w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;