import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/Socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const socketRef = useRef(null);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    const chatMessages = chat?.data.messages.map((msg) => {
      return {
        firstName: msg.senderId?.firstName || "Unknown",
        senderId: msg.senderId?._id,
        text: msg.text,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    if (!userId || !targetUserId) return;
    fetchChatMessages();
  }, [userId, targetUserId]);
  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      userId,
      targetUserId,
    });

    socket.on("messageReceivd", ({ firstName, text }) => {
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessages.trim()) return;
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessages,
    });
    setNewMessages("");
  };

  return (
    <>
      <h1 className="text-center font-bold overflow-x-hidden text-2xl mt-5">
        Chat
      </h1>
      <div className="card m-auto card-border bg-base-100 w-96 h-96 border-black">
        <div className="card-body relative">
          <div
            className="overflow-y-auto overflow-x-hidden h-72 pr-2 w-full"
            style={{ maxHeight: "18rem" }}
          >
            {messages.map((msg, index) => {
              const isSender = msg.senderId === userId;
              return (
                <div key={index}>
                  <div
                    className={`chat ${
                      isSender ? "chat-end" : "chat-start"
                    } flex flex-col`}
                  >
                    <div className="chat-header">{msg.firstName}</div>
                    <div className="chat-bubble">{msg.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 absolute bottom-4 left-0 w-full px-4">
            <input
              value={newMessages}
              onChange={(e) => setNewMessages(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input w-full"
            />
            <button onClick={sendMessage} className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
