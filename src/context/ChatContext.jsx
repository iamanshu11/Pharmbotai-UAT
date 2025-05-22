import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

const defaultBotMessage = [
  {
    sender: 'bot',
    text:
      "Hello! I'm your pharmacy AI assistant. I can help you with medication information, compliance checks, and general pharmacy-related questions. How can I assist you today?",
    isRichText: false,
  },
];

export function ChatProvider({ children }) {
  const [messages, _setMessages] = useState(defaultBotMessage);
  // Wrap setMessages to always reset to defaultBotMessage if empty array is passed
  const setMessages = (updater) => {
    if (Array.isArray(updater)) {
      if (updater.length === 0) {
        _setMessages(defaultBotMessage);
      } else {
        _setMessages(updater);
      }
    } else if (typeof updater === 'function') {
      _setMessages((prev) => {
        const result = updater(prev);
        return Array.isArray(result) && result.length === 0 ? defaultBotMessage : result;
      });
    } else {
      _setMessages(updater);
    }
  };
  return (
    <ChatContext.Provider value={{ messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
}
export function useChat() {
  return useContext(ChatContext);
} 