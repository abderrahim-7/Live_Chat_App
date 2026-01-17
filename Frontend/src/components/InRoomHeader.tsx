import { useNavigate } from "react-router-dom";

type InRoomHeaderProps = {
  roomName: string | undefined;
  roomCode: string | undefined;
};

const InRoomHeader = ({ roomName, roomCode }: InRoomHeaderProps) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className=" w-full h-1/4 rounded-2xl p-4 pt-6 relative backdrop-blur-md border border-white/20">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate("/")}
          className="text-white/70 hover:text-white transition text-sm"
        >
          ← Back
        </button>
      </div>

      <div className="absolute top-4 right-4">
        <button
          onClick={logout}
          className="text-white/70 hover:text-white transition text-sm"
        >
          Logout
        </button>
      </div>

      <div className="h-full flex flex-col items-center justify-center text-center ">
        <h1 className="text-white text-3xl font-semibold mb-1">{roomName}</h1>
        <p className="text-white/60 text-xl tracking-wide">#{roomCode}</p>
      </div>
    </div>
  );
};

export default InRoomHeader;
