import { Bot, User } from 'lucide-react'
import TypingEffect from './TypingEffect'
import { useState, useEffect } from 'react'

const thinkingMessages = [
  "Analyzing your query...",
  "Gathering information...",
  "Looking into it...",
  "Gears are turning...",
  "Processing your request...",
  "Consulting medical database...",
  "Checking pharmacy records...",
  "Formulating response..."
];

export default function Message({ sender, text, isThinking = false, isRichText = false }) {
  const isBot = sender === 'bot'
  const [currentThinkingMessage, setCurrentThinkingMessage] = useState(thinkingMessages[0]);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (isThinking) {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % thinkingMessages.length);
        setCurrentThinkingMessage(thinkingMessages[messageIndex]);
      }, 2000); // Change message every 2 seconds

      return () => clearInterval(interval);
    }
  }, [isThinking, messageIndex]);

  const renderStructuredContent = (content) => {
    const lines = content.split('\n');
    const elements = [];
    let listType = null; // null, 'ol', 'ul'
    let listItems = [];

    const flushList = () => {
      if (listItems.length > 0) {
        if (listType === 'ol') {
          elements.push(<ol key={`ol-${elements.length}`} className="list-decimal list-inside ml-4">{listItems}</ol>);
        } else if (listType === 'ul') {
          elements.push(<ul key={`ul-${elements.length}`} className="list-disc list-inside ml-4">{listItems}</ul>);
        }
        listItems = [];
        listType = null;
      }
    };

    lines.forEach((line, index) => {
      let trimmedLine = line.trim();

      // If a heading carries an inline enumeration (e.g., "### Title 1."), strip the trailing number
      if (trimmedLine.startsWith('###')) {
        flushList();
        // remove '###', then remove any 'NUMBER.' that follows
        const headingText = trimmedLine
          .replace(/^###/, '')
          .replace(/\s*\d+[\.\)]\s*/, '')
          .trim();
        elements.push(
          <h1 key={index} className="text-lg font-bold text-[#02410A] dark:text-white mt-4">
            {headingText}
          </h1>
        );
        return;
      }

      // Subheading (bold) with optional leading enumeration
      if (trimmedLine.startsWith('**')) {
        flushList();
        // strip any leading number+dot before the bold text
        const subheadingText = trimmedLine
          .replace(/\*\*/g, '')
          .replace(/^\d+[\.\)]\s*/, '')
          .trim();
        elements.push(
          <h2 key={index} className="text-md font-semibold text-[#02410A] dark:text-white mt-2">
            {subheadingText}
          </h2>
        );
        return;
      }

      // Ordered or unordered list items
      if (/^(\d+[\.\)]|[\*\-\u2022])\s*/.test(trimmedLine)) {
        const isOrdered = /^\d+[\.\)]/.test(trimmedLine);
        if (listType !== (isOrdered ? 'ol' : 'ul')) {
          flushList();
          listType = isOrdered ? 'ol' : 'ul';
        }
        const itemContent = trimmedLine.replace(/^(\d+[\.\)]|[\*\-\u2022])\s*/, '').trim();
        listItems.push(
          <li key={index} className="text-sm text-[#02410A] dark:text-white">
            {itemContent}
          </li>
        );
        return;
      }

      // Regular paragraph text
      if (trimmedLine !== '') {
        flushList();
        elements.push(
          <p key={index} className="text-sm text-[#02410A] dark:text-white mt-1">
            {trimmedLine}
          </p>
        );
      } else {
        // empty line: flush if next isn't a list
        if (index + 1 < lines.length && !/^(\d+[\.\)]|[\*\-\u2022])\s*/.test(lines[index + 1].trim())) {
          flushList();
        }
      }
    });

    flushList();
    return <div className="rich-text space-y-1">{elements}</div>;
  };

  return (
    <div className={`flex ${isBot ? 'items-start' : 'justify-end'} gap-3`}>
      {isBot && (
        <div className="pt-1">
          <Bot size={32} className="text-[#02410A] dark:text-white" />
        </div>
      )}

      <div
        className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm transition-colors duration-300 ${
          isBot
            ? 'bg-[#E6EAF1] text-[#02410A] dark:bg-[#0F5518] dark:text-white rounded-tl-none'
            : 'bg-[#ced3dd] text-[#02410A] dark:bg-[#0c2e10] dark:text-white rounded-tr-none'
        }`}
      >
        {isThinking ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#02410A] dark:bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-[#02410A] dark:bg-white rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
              <div className="w-2 h-2 bg-[#02410A] dark:bg-white rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
            </div>
            <div className="text-sm text-[#02410A] dark:text-white animate-shimmer">
              {currentThinkingMessage}
            </div>
          </div>
        ) : isRichText ? (
          <div className="animate-shimmer">
            {renderStructuredContent(text)}
          </div>
        ) : (
          <div className="animate-shimmer">
            <TypingEffect text={text} />
          </div>
        )}
      </div>

      {!isBot && (
        <div className="pt-1">
          <User size={32} className="text-[#02410A] dark:text-white border rounded-full" />
        </div>
      )}
    </div>
  );
}