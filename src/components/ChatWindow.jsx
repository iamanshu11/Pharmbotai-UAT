import { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import Message from './Message';
import { chatApi } from '../api/chat_api_helper';
import { XCircle } from 'lucide-react';

export default function ChatWindow({ messages, setMessages }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const endOfMessagesRef = useRef(null);

  const handleSend = async (text) => {
    const token = localStorage.getItem('token');

    // Add user message
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text, isRichText: false },
    ]);

    // Show thinking indicator
    setIsAnalyzing(true);
    setMessages((prev) => [
      ...prev,
      { sender: 'bot', text: '', isThinking: true, isRichText: false },
    ]);

    try {
      const response = await chatApi.submitQuery(token, text);

      if (response?.status === 'success' && response.data?.response) {
        const aiResponse = response.data.response;

        // Replace thinking bubble with bot response (initially plain for typing)
        setIsAnalyzing(false);
        setMessages((prev) => [
          ...prev.filter((m) => !m.isThinking),
          { sender: 'bot', text: aiResponse, isRichText: false },
        ]);

        // After a typing delay, convert to rich text
        const typingDelay = Math.min(aiResponse.length * 20, 5000);
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((m) =>
              m.sender === 'bot' && m.text === aiResponse && m.isRichText === false
                ? { ...m, isRichText: true }
                : m
            )
          );
        }, typingDelay);
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      setIsAnalyzing(false);
      let errorMessage = 'Sorry, something went wrong. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Show toast on unrelated query
      if (errorMessage === '400') {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 1000);
      }

      const fallback = {
        sender: 'bot',
        text:
          errorMessage === '400'
            ? `⚠️ Your query seems unrelated to pharmacy topics. Please ask questions related to pharmacy, such as medication usage, pharmacy protocols, or patient counseling.`
            : errorMessage,
        isRichText: false,
      };

      setMessages((prev) => [
        ...prev.filter((m) => !m.isThinking),
        fallback,
      ]);
    }
  };

  // Auto-scroll on new messages
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="relative w-full max-w-4xl h-[86vh] bg-[#FAFBFD] text-black dark:bg-[#02410A] dark:text-white rounded-2xl shadow-xl flex flex-col transition-colors duration-300">
      {/* Toast popup */}
      {showToast && (
        <div className="absolute top-4 right-4 bg-red-100 text-red-800 px-4 py-2 rounded flex items-center gap-2 shadow-lg">
          <XCircle size={20} />
          <span>Ask pharmacy related question only</span>
        </div>
      )}

      {/* Top status bar */}
      <div className="p-4 flex justify-between items-center border-b border-green-300 dark:border-green-700">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
          <span className="font-semibold">AI Assistant Active</span>
        </span>
        <span className="text-sm">📈 92% Confidence</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <Message
            key={i}
            sender={msg.sender}
            text={msg.text}
            isThinking={msg.isThinking || false}
            isRichText={msg.isRichText || false}
          />
        ))}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Chat Input */}
      <ChatInput onSend={handleSend} />
    </div>
  );
}







