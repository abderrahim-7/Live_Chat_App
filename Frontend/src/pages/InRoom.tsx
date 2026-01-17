import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InRoomHeader from "../components/InRoomHeader";
import ChatMessages from "../components/ChatComponent";
import type { Chat } from "../components/ListChats";
import type { Message } from "../components/ChatComponent";
import { getRoom } from "../api/chat";
import { getMessages } from "../api/messages";
import { getCurrentUserId } from "../utils/auth";
import { socket } from "../utils/socket";

const InRoom = () => {
  const { id: roomId } = useParams();
  const [chat, setChat] = useState<Chat>();
  const [messages, setMessages] = useState<Message[]>([]);
  const userId = getCurrentUserId();

  useEffect(() => {
    const initRoom = async () => {
      const data = await getRoom(roomId);
      setChat(data.room);

      const msgRes = await getMessages(roomId);
      setMessages(
        msgRes.map((m: any) => ({
          _id: m._id,
          content: m.content,
          sender: m.sender,
          isMe: m.sender?._id === userId,
        })),
      );
    };

    initRoom();
  }, [roomId, userId]);

  useEffect(() => {
    socket.connect();
    socket.emit("join-room", roomId);

    socket.on("new-message", (m: any) => {
      setMessages((prev) => [
        ...prev,
        {
          _id: m._id,
          content: m.content,
          sender: m.sender,
          isMe: m.sender === userId || m.sender?._id === userId,
        },
      ]);
    });

    return () => {
      socket.off("new-message");
      socket.disconnect();
    };
  }, [roomId, userId]);

  const handleSend = (content: string) => {
    socket.emit("send-message", {
      roomId,
      content,
    });
  };

  return (
    <>
      <InRoomHeader roomName={chat?.name} roomCode={chat?.code} />
      <ChatMessages
        messages={messages}
        onSend={handleSend}
        roomId={roomId || ""}
      />
    </>
  );
};

export default InRoom;
