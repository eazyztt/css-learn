import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatCard from "./chatCard";
import Header from "./header";
import TelegramLogin from "../typeMessageAndChat/tgLogin";

export default function InutScryan() {
  const [chats, setChat] = useState([]);
  const navigate = useNavigate();

  const fetchBigChats = async () => {
    try {
      const response = await fetch("http://localhost:3000/bigChats", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setChat(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    //fetchJoke();
    fetchBigChats();
  }, []);

  const newChatCreation = async () => {
    try {
      const response = await fetch("http://localhost:3000/bigChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      console.log("Server response:", result);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };

  console.log("InutScryan chats:", chats);
  return (
    <>
      <Header />
      <div class="mt-30">
        {chats.map((chat) => (
          <ChatCard key={chat.id} name={chat.title} chatId={chat.id} />
        ))}
      </div>

      <div class="bg-white "></div>
      <button
        class="px-11 py-9 bg-cyan-600 fixed bottom-10 right-10 rounded-full font-bold text-2xl text-white active:bg-cyan-700"
        onClick={async () => {
          navigate("/newChat");
        }}
      >
        +
      </button>
    </>
  );
}
