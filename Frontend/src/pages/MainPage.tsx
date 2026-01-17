import { useEffect, useState, type SetStateAction } from "react";
import JoinRoom from "../components/JoinRoom";
import ListChats, { type Chat } from "../components/ListChats";
import { getRooms } from "../api/chat";

const MainPage = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await getRooms();
        setChats(rooms);
      } catch (err) {
        console.error("Failed to load rooms", err);
      }
    };
    fetchRooms();
  }, []);

  return (
    <>
      <JoinRoom setChats={setChats} />
      <ListChats chats={chats} setChats={setChats} />
    </>
  );
};

export default MainPage;
