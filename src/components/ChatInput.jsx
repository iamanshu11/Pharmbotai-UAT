import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Clipboard,
  FileDown,
  PlusCircle,
  User,
  MoreHorizontal
} from 'lucide-react'

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState('')
  const desktopRef = useRef(null)
  const mobileRef = useRef(null)

  const isMobile = window.innerWidth <= 640 // sm breakpoint

  const sendMessage = () => {
    if (!input.trim()) return
    onSend(input)
    setInput('')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input)
  }

  // Auto-resize for current textarea view
  useEffect(() => {
    const activeRef = isMobile ? mobileRef.current : desktopRef.current
    if (activeRef) {
      activeRef.style.height = 'auto'
      activeRef.style.height = `${activeRef.scrollHeight}px`
    }
  }, [input, isMobile])

  return (
    <div className="p-4 border-t rounded-bl-full rounded-br-full border-green-300 dark:border-green-700 bg-white dark:bg-[#02410A] transition-colors duration-300">
      {/* Desktop View */}
      <div className="hidden sm:block border border-[#71bf44] dark:border-green-700 rounded-2xl px-4 py-3">
        <div className="  bg-transparent dark:bg-transparent">
          <textarea
            ref={desktopRef}
            placeholder="Ask a pharmacy-related question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();      // Prevents new line
                sendMessage();           // Triggers your send logic
              }
            }}
            rows={1}
            className="w-full bg-transparent custom-scrollbar text-[#02410A] dark:text-white placeholder:text-green-700 dark:placeholder:text-white px-2 outline-none resize-none max-h-40 overflow-y-auto text-base"
          />
        </div>

        {/* Action Buttons (Icons Only with Tooltips on Hover) */}
        <div className="mt-3 flex justify-between items-center">
          {/* Left Icon Buttons */}
          <div className="flex items-center gap-3">
            {/* Download PDF */}
            <div className="relative group">
              <button className="p-2 rounded-full bg-gray-100 dark:bg-green-900 text-[#02410A] dark:text-white hover:bg-green-100 dark:hover:bg-green-700 transition">
                <FileDown size={18} />
              </button>
              <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Download PDF
              </span>
            </div>

            {/* Escalate to Human */}
            <div className="relative group">
              <button className="p-2 rounded-full bg-gray-100 dark:bg-green-900 text-[#02410A] dark:text-white hover:bg-green-100 dark:hover:bg-green-700 transition">
                <User size={18} />
              </button>
              <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Escalate to Human
              </span>
            </div>

            {/* Add New Question */}
            <div className="relative group">
              <button className="p-2 rounded-full bg-lime-500 dark:bg-[#71BF44] text-[#02410A] dark:text-white hover:bg-green-600 transition">
                <PlusCircle size={18} />
              </button>
              <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Add New Question
              </span>
            </div>
          </div>

          {/* Right Icon Buttons */}
          <div className="flex items-center gap-3">
            {/* Copy */}
            <div className="relative group">
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-full bg-gray-100 dark:bg-green-900 text-[#02410A] dark:text-white hover:bg-green-100 dark:hover:bg-green-700 transition"
              >
                <Clipboard size={18} />
              </button>
              <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Copy to Clipboard
              </span>
            </div>

            {/* Send */}
            <div className="relative group">
              <button
                onClick={sendMessage}
                className="p-2 rounded-full bg-[#71BF44] text-white hover:bg-green-600 transition"
              >
                <Send size={18} />
              </button>
              <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Send
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden border-t border-green-300 dark:border-green-700 bg-white dark:bg-green-800 rounded-2xl p-3 shadow-md">
        <div className="flex items-start justify-between">
          <textarea
            ref={mobileRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();  // Prevent default Enter behavior
                sendMessage();       // Send the message when Enter is pressed
              }
            }}
            placeholder="Ask a pharmacy-related question..."
            rows={1}
            className="flex-1 text-[16px] text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 bg-transparent outline-none resize-none max-h-40 overflow-y-auto"
          />

        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-400 dark:border-gray-300 text-black dark:text-white text-xs">
              <FileDown size={16} />
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-400 dark:border-gray-300 text-black dark:text-white text-xs">
              <User size={14} />
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-400 dark:border-gray-300 text-black dark:text-white text-xs">
              <PlusCircle size={16} />
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-400 dark:border-gray-300 text-black dark:text-white text-xs">
              <MoreHorizontal size={14} />
            </button>
          </div>
          <button
            onClick={sendMessage}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-green-500"
          >
            <Send size={14} className="text-gray-700 dark:text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
