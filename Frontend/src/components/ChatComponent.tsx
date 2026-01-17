import { useState } from "react";

export interface Message {
  _id: string;
  sender: {
    _id: string;
    username: string;
  };
  content: string;
  isMe: boolean;
}

interface Props {
  messages: Message[];
  onSend: (message: string) => void;
}

const ChatMessages = ({ messages, onSend }: Props) => {
  const [message, setMessage] = useState("");

  const send = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="bg-white/90 min-h-0 w-full flex-1 rounded-2xl flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-xl text-sm
                ${
                  msg.isMe
                    ? "bg-blue-500 text-white rounded-br-sm"
                    : "bg-gray-200 text-gray-800 rounded-bl-sm"
                }`}
            >
              <p className="text-xs font-semibold mb-1 opacity-80">
                {msg.sender.username}
              </p>
              <p className="break-words">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-200 bg-white/40 backdrop-blur-md rounded-b-2xl flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
          className="flex-1 bg-transparent outline-none px-3 py-2 text-gray-800 placeholder-gray-500"
        />

        <button
          onClick={send}
          className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 transition flex items-center justify-center text-white"
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatMessages;
