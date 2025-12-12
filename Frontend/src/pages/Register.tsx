import { useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Background from "../assets/Lunada.jpg";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (username.length < 4) {
      toast.error("Username must be at least 4 characters", {
        icon: (
          <AiOutlineCloseCircle style={{ color: "white", fontSize: "26px" }} />
        ),
      });
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters", {
        icon: (
          <AiOutlineCloseCircle style={{ color: "white", fontSize: "26px" }} />
        ),
      });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        icon: (
          <AiOutlineCloseCircle style={{ color: "white", fontSize: "26px" }} />
        ),
      });
      return;
    }
    toast.success("Registered successfully!", {
      icon: (
        <AiOutlineCheckCircle style={{ color: "white", fontSize: "26px" }} />
      ),
    });
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        toastStyle={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
        progressClassName="custom-progress"
      />

      <div className="w-11/12 max-w-md sm:w-3/4 md:w-1/2 lg:w-2/5 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl flex flex-col justify-center items-center gap-6">
        <h1 className="text-white text-3xl sm:text-4xl font-[Geom]">
          Register
        </h1>

        <div className="w-full flex flex-col">
          <label className="text-white mb-1 font-semibold" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <div className="w-full flex flex-col relative">
          <label
            className="text-white mb-1 font-semibold"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white border border-white/30 backdrop-blur-sm transition duration-200 focus:bg-white/30 focus:backdrop-blur-md hover:bg-white/25 hover:backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-9 text-white text-xl hover:text-gray-200 transition"
          >
            {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        <button
          onClick={handleRegister}
          className="w-full cursor-pointer bg-white/30 hover:bg-white/50 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Register
        </button>

        <p className="text-white mt-2 text-sm sm:text-base text-center">
          Already have an account?{" "}
          <a href="/login" className="underline hover:text-gray-200">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
