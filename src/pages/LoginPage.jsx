import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../assets/Rumah Fantasi 1.svg";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    // Simulate successful login (replace with real auth)
    // On success navigate to beranda
    navigate("/beranda");
  }

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-[#F5EEE9]">
      {/* Left login form */}
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
            Welcome to Artzy
          </h1>
          <p className="text-lg font-medium text-[#4A2E1E]">
            Log into your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-4 max-w-md">
          <div className="flex flex-col gap-2">
            <label className="text-[#4A2E1E] font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#D8CCC4] px-4 py-3 rounded-full outline-none placeholder:text-[#9A8D83] border-2 border-transparent transition-all duration-200 hover:shadow-lg hover:bg-[#D8CCC4] focus:border-[#4A2E1E] focus:bg-[#D8CCC4] focus:shadow-lg"
              placeholder="example@gmail.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#4A2E1E] font-semibold">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#D8CCC4] px-4 py-3 rounded-full outline-none placeholder:text-[#9A8D83] border-2 border-transparent transition-all duration-200 hover:shadow-lg hover:bg-[#D8CCC4] focus:border-[#4A2E1E] focus:bg-[#D8CCC4] focus:shadow-lg"
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

          <button type="button" className="self-start text-sm text-[#4A2E1E] hover:underline mt-1">
            Forgot Password
          </button>

          {error && (
            <div className="text-sm text-red-600 font-medium">{error}</div>
          )}

          <button type="submit" className="mt-2 bg-[#4A2E1E] text-white py-3 rounded-full font-bold text-lg shadow-md hover:scale-105 transition w-full">
            Login
          </button>

          <p className="text-sm text-[#4A2E1E] mt-2 text-center">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </div>

      {/* Right image */}
      <div className="w-3/5 h-full flex items-center justify-center pr-10">
        <div className="w-11/12 rounded-3xl shadow-xl overflow-hidden bg-[#F5EEE9]">
          <img
            src={loginBg}
            alt="Login Side Art"
            className="block w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
