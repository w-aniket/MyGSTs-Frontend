import { useState, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { sendChatMessageApi } from "../../Utils/APIs/chatBotApi"; // adjust path to match your structure
import "./ChatPanel.css";

const ChatPanel = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const data = await sendChatMessageApi(userMessage, history);

      if (data.success) {
        setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: "Sorry, something went wrong. Please try again.",
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Sorry, I'm having trouble connecting right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-panel">
      <div className="chat-panel-header">
        <span>MyGSTs Assistant</span>
        <button
          onClick={onClose}
          className="chat-panel-close"
          aria-label="Close chat"
        >
          <FaTimes />
        </button>
      </div>

      <div className="chat-panel-messages">
        {messages.length === 0 && (
          <div className="chat-panel-empty">
            Ask me about GST filing, ITR, company registration, or any of our
            compliance services.
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble-row ${msg.role === "user" ? "user" : "model"}`}
          >
            <div
              className={`chat-bubble ${msg.role === "user" ? "user" : "model"}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="chat-panel-typing">Typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-panel-disclaimer">
        AI-generated responses. For specific advice, contact our team.
      </div>

      <div className="chat-panel-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
