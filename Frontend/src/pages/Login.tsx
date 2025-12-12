import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Background from "../assets/Lunada.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="w-screen h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="w-11/12 max-w-md sm:w-3/4 md:w-1/2 lg:w-2/5 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl flex flex-col justify-center items-center gap-6">
        <h1 className="text-white text-3xl sm:text-4xl font-[Geom]">Login</h1>

        <div className="w-full flex flex-col">
          <label className="text-white mb-1 font-semibold" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white border border-white/30 backdrop-blur-sm transition duration-200 focus:bg-white/30 focus:backdrop-blur-md hover:bg-white/25 hover:backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
        </div>

        <div className="w-full flex flex-col relative">
          <label className="text-white mb-1 font-semibold" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white border border-white/30 backdrop-blur-sm transition duration-200 focus:bg-white/30 focus:backdrop-blur-md hover:bg-white/25 hover:backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-white text-xl hover:text-gray-200 transition"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        <button className="w-full cursor-pointer bg-white/30 hover:bg-white/50 text-white font-semibold py-2 rounded-lg transition duration-200">
          Login
        </button>

        <p className="text-white mt-2 text-sm sm:text-base text-center">
          Don't have an account?{" "}
          <a href="/register" className="underline hover:text-gray-200">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
