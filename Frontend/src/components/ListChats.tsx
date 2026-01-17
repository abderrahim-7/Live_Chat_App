import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";
import { quitRoom } from "../api/chat";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface LastMessage {
  _id: string;
  content: string;
  sender: { username: string };
  createdAt: string;
}

export interface Chat {
  _id: string;
  name: string;
  lastMessage: LastMessage | null;
  code: string;
}

interface Props {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}

const ListChats = ({ chats, setChats }: Props) => {
  const handleRemove = async (id: string) => {
    try {
      quitRoom(id);
      setChats((prev) => prev.filter((chat) => chat._id !== id));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error has happend", {
        icon: <AiOutlineCloseCircle style={{ fontSize: "26px" }} />,
      });
    }
  };

  const navigate = useNavigate();
  return (
    <div className="bg-white/90 w-full h-3/4 rounded-2xl p-3 overflow-y-auto">
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
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Your Chats</h2>

      <div className="flex flex-col gap-2">
        {chats.map((chat) => (
          <div key={chat._id} className="relative">
            <abbr title="Quit Room ?">
              <button
                className="flex justify-center items-center rounded-full cursor-pointer absolute h-8 w-8 right-3 top-1/4 text-center z-10"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #20bdff, #a5fecb)",
                }}
                onClick={(e) => {
                  handleRemove(chat._id);
                }}
              >
                <AiOutlineClose color="white" />
              </button>
            </abbr>
            <div
              className="p-3 rounded-xl bg-white shadow hover:bg-gray-100 cursor-pointer transition"
              onClick={() => {
                navigate(`/room/${chat._id}`);
              }}
            >
              <p className="font-medium text-gray-800">{chat.name}</p>
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage?.sender?.username && chat.lastMessage?.content
                  ? `${chat.lastMessage.sender.username}: ${chat.lastMessage.content}`
                  : "No messages yet"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListChats;
