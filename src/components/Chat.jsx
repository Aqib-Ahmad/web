import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/Socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  console.log(targetUserId);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  useEffect(() => {
    if (!userId) {
      return;
    }
    // as soon page loads  , the socket connection is made and jooinchat event is emitted
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessages,
    });
    console.log({ firstName: user.firstName, text: newMessages });

    socket.on("messageReceivd", ({ firstName, text }) => {
      console.log(firstName + " from " + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });
    // disconnect after connecting
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);
  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
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
            className="overflow-y-auto h-72 pr-2"
            style={{ maxHeight: "18rem" }} // adjust as needed
          >
            {messages.map((msg, index) => {
              const isSender = msg.firstName === user.firstName;
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
