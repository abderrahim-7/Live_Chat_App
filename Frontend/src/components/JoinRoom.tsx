import { useState } from "react";
import { createRoom, joinRoom } from "../api/chat";
import { Slide, toast, ToastContainer } from "react-toastify";
import { AiOutlineCloseCircle } from "react-icons/ai";
import type { Chat } from "./ListChats";

interface Props {
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}

const JoinRoom = ({ setChats }: Props) => {
  const [mode, setMode] = useState<"create" | "join">("create");
  const [value, setValue] = useState("");

  const handleCreate = async () => {
    if (mode === "join") {
      setMode("create");
      setValue("");
    } else {
      try {
        const res = await createRoom(value);
        setChats((prev) => [...prev, res.room]);
        setValue("");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "An error has happend", {
          icon: <AiOutlineCloseCircle style={{ fontSize: "26px" }} />,
        });
      }
    }
  };

  const handleJoin = async () => {
    if (mode === "create") {
      setMode("join");
      setValue("");
    } else {
      try {
        const res = await joinRoom(value);
        setChats((prev) => [...prev, res.room]);
        setValue("");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "An error has happend", {
          icon: <AiOutlineCloseCircle style={{ fontSize: "26px" }} />,
        });
      }
    }
  };

  return (
    <div className=" w-full h-1/4 rounded-2xl p-4 pt-6 flex flex-col gap-2 relative">
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
          background: "rgba(255, 255, 255, 1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
        progressClassName="custom-progress"
      />
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className=" absolute -top-2 left-1/2 -translate-x-1/2 text-lg text-[Geom] text-white/70 hover:text-white transition"
      >
        Logout
      </button>
      <div className="flex gap-3">
        <button
          onClick={handleCreate}
          className={`flex-1 py-2 rounded-xl text-white font-semibold backdrop-blur-md border border-white/20 transition
                ${
                  mode === "create"
                    ? "bg-white/30"
                    : "bg-white/10 hover:bg-white/20"
                }`}
        >
          Create Chat
        </button>

        <button
          onClick={handleJoin}
          className={`flex-1 py-2 rounded-xl text-white font-semibold backdrop-blur-md border border-white/20 transition
                ${
                  mode === "join"
                    ? "bg-white/30"
                    : "bg-white/10 hover:bg-white/20"
                }`}
        >
          Join Chat
        </button>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={
          mode === "create" ? "Enter room name..." : "Enter room code..."
        }
        className="w-full px-4 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 outline-none border border-white/20 backdrop-blur-md"
      />
    </div>
  );
};

export default JoinRoom;
