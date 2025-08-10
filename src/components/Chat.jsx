import { useState } from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { targetUserId } = useParams();
  console.log(targetUserId);
  const [messages, setMessages] = useState([{ text: "hello" }]);
  return (
    <>
      <h1 className="text-center font-bold  text-2xl mt-5">Chat</h1>
      <div className="card m-auto card-border bg-base-100 w-96 h-96 border-black">
        <div className="card-body">
          <h2 className="card-title">
            {messages.map((msg, index) => (
              <div key={index}>
                <div className="chat chat-start">
                  <div className="chat-header">
                    Obi-Wan Kenobi
                    <time className="text-xs opacity-50">2 hours ago</time>
                  </div>
                  <div className=" chat-bubble-primary">{msg.text}</div>
                  <div className="chat-footer opacity-50">Seen</div>
                </div>
              </div>
            ))}
          </h2>
          <div className=" flex gap-2 absolute bottom-4 ">
            <input type="text" placeholder="Type here" className="input " />
            <button className="btn btn-primary">Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
