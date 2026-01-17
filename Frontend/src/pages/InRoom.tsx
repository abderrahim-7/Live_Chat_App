import { useEffect, useState } from "react";
import InRoomHeader from "../components/InRoomHeader";
import ChatMessages from "../components/ChatComponent";
import type { Chat } from "../components/ListChats";
import type { Message } from "../components/ChatComponent";
import { getRoom } from "../api/chat";
import api from "../api/axios";
import { useParams } from "react-router-dom";

const InRoom = () => {
  const { id: roomId } = useParams();
  const [chat, setChat] = useState<Chat>();
  const [messages, setMessages] = useState<Message[]>([]);
  const userId = localStorage.getItem("userId"); // or decode JWT

  useEffect(() => {
    const initRoom = async () => {
      try {
        const data = await getRoom(roomId);
        setChat(data.room);

        const msgRes = await api.get(`/api/messages/${roomId}`);
        setMessages(
          msgRes.data.map((m: any) => ({
            _id: m._id,
            content: m.content,
            sender: m.sender,
            isMe: m.sender._id === userId,
          }))
        );
      } catch (err) {
        console.error("Failed to load room", err);
      }
    };
    initRoom();
  }, [roomId]);

  return (
    <>
      <InRoomHeader roomName={chat?.name} roomCode={chat?.code} />
      <ChatMessages messages={messages} onSend={() => {}} />
    </>
  );
};

export default InRoom;
