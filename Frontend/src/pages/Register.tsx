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
import { signUp } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
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

    try {
      setLoading(true);
      const res = await signUp(username, password);
      localStorage.setItem("token", res.token);

      toast.success("Registered successfully!", {
        icon: (
          <AiOutlineCheckCircle style={{ color: "white", fontSize: "26px" }} />
        ),
      });
      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed", {
        icon: (
          <AiOutlineCloseCircle style={{ color: "white", fontSize: "26px" }} />
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
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

        {/* Username */}
        <div className="w-full flex flex-col">
          <label className="text-white mb-1 font-semibold">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white border border-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
        </div>

        {/* Password */}
        <div className="w-full flex flex-col relative">
          <label className="text-white mb-1 font-semibold">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white border border-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-white text-xl"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="w-full flex flex-col relative">
          <label className="text-white mb-1 font-semibold">
            Confirm Password
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white border border-white/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-9 text-white text-xl"
          >
            {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-white/30 hover:bg-white/50 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-white text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
