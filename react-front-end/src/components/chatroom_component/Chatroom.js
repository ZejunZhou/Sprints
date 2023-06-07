import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
// Chatroom.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import "./chatroom.css";
import { v4 as uuidv4 } from "uuid";

// const socket = io("http://host.docker.internal:3001"); // Replace with your server URL
// https://5cfc03dafcca.ngrok.app/

const socket = io("http://localhost:3001");

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [userId] = useState(uuidv4());

  useEffect(() => {
    const onMessageReceived = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("message", onMessageReceived);

    return () => {
      socket.off("message", onMessageReceived);
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage) {
      socket.emit("message", { text: inputMessage, sender: userId });
      setInputMessage("");
    }
  };

  return (
    <div>
      <div className="chatroom-container">
        <div className="chat-container">
          <div className="messages-box">
            <ScrollToBottom>
              <div className="scrollauto-box">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    style={{
                      textAlign: message.sender === userId ? "right" : "left",
                      marginBottom: "5px",
                    }}
                  >
                    <div
                      className={`message-bubble ${
                        message.sender === userId ? "sent" : "received"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollToBottom>
          </div>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button className="buttonStyleChat" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

function DummyPage() {
  console.log(Cookies.get("authenticated"));
  return (
    <div style={{ backgroundColor: " rgb(36, 10, 78)", minHeight: "100vh" }}>
      <div className="component-div">
        <h1 className="h1">Chatroom</h1>
      </div>
      <Chatroom />
    </div>
  );
}

export default DummyPage;
