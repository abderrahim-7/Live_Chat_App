import { useState } from "react";
import type { Message } from "../components/Chat";
import InRoomHeader from "../components/InRoomHeader";
import Chat from "../components/Chat";

const InRoom = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "Yassine", content: "Hey!", isMe: false },
    { id: 2, sender: "Me", content: "Hi 👋", isMe: true },
    { id: 3, sender: "Yassine", content: "How are you?", isMe: false },
    { id: 4, sender: "Me", content: "All good, you?", isMe: true },
  ]);

  const sendMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "Me",
        content,
        isMe: true,
      },
    ]);
  };
  return (
    <>
      <InRoomHeader roomName={"New Chat"} roomCode={"123-456"} />
      <Chat messages={messages} onSend={sendMessage} />
    </>
  );
};

export default InRoom;
