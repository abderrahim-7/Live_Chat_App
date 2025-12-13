import { useState } from "react";
import Background from "../assets/Lunada.jpg";
import Chat, { type Message } from "../components/Chat";
import InRoom from "../components/InRoomHeader";
import JoinRoom from "../components/JoinRoom";
import ListChats from "../components/ListChats";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  const chats = [
    { id: 1, name: "General Chat", lastMsg: "Hey there!" },
    { id: 2, name: "Project Team", lastMsg: "Deadline is tomorrow" },
    { id: 3, name: "Friends", lastMsg: "Let’s meet tonight" },
  ];

  return (
    <>
      <JoinRoom />
      <ListChats chats={chats} />
    </>
  );
};

export default MainPage;
