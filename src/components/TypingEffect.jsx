import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!text) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 5); // Adjust typing speed here (lower = faster)

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      if (onComplete) onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return (
    <div className="relative">
      <div className="text-gray-800 dark:text-white">
        {displayedText}
        {isTyping && (
          <span className="inline-block w-2 h-4 ml-1 bg-gray-400 dark:bg-gray-600 animate-pulse"></span>
        )}
      </div>
      {isTyping && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent animate-shimmer"></div>
      )}
    </div>
  );
};

export default TypingEffect; 