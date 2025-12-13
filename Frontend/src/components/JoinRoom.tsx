import { useState } from "react";

const JoinRoom = () => {
  const [mode, setMode] = useState<"create" | "join">("create");
  const [value, setValue] = useState("");
  return (
    <div className=" w-full h-1/4 rounded-2xl p-4 pt-6 flex flex-col gap-2 relative">
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
          onClick={() => {
            setMode("create");
            setValue("");
          }}
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
          onClick={() => {
            setMode("join");
            setValue("");
          }}
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
