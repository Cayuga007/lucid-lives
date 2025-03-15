import React, { useState, useRef, useEffect } from 'react';

const Section1 = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatTitle, setChatTitle] = useState('Cupid');
  const messagesEndRef = useRef(null);

  // Initial messages for the chat
  useEffect(() => {
    const initialMessages = [
      { text: 'Hey', type: 'bot' },
    ];
    
    setMessages(initialMessages);
    
    // Add a slight delay before showing the first reply option
    setTimeout(() => {
      setMessages(prev => [...prev, 
        { text: 'I think you got the wrong number', type: 'user' }
      ]);
    }, 1000);
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle user input submission
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    setMessages(prev => [...prev, { text: inputValue, type: 'user' }]);
    setInputValue('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      handleBotResponse();
    }, 1000);
  };

  // Handle bot response based on conversation flow
  const handleBotResponse = () => {
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage.text === 'I think you got the wrong number') {
      setMessages(prev => [...prev, 
        { text: 'Wrong number?! Pfftt that\'s not possible', type: 'bot' },
        { text: 'You summoned me afterall...', type: 'bot' },
        { text: 'You\'re the one playing this quiz!', type: 'bot' }
      ]);
      
      // Add next user option
      setTimeout(() => {
        setMessages(prev => [...prev, 
          { text: 'Summoned you?', type: 'user' }
        ]);
      }, 1500);
    } else if (lastMessage.text === 'Summoned you?') {
      setMessages(prev => [...prev, 
        { text: 'Ok ok, I\'ll explain everything', type: 'bot' },
        { text: 'I\'m your personal Cupid!', type: 'bot' },
        { text: 'Your love life is my job!!', type: 'bot' }
      ]);
      
      // Add next user option
      setTimeout(() => {
        setMessages(prev => [...prev, 
          { text: 'Oh really? Clearly you need to work harder', type: 'user' }
        ]);
      }, 1500);
    } else {
      // For any other message, change to Unknown mode
      setChatTitle('Unknown');
      setMessages(prev => [...prev, 
        { text: 'Who are you?!', type: 'bot' },
        { text: 'lol idk what ur talking abt', type: 'bot' }
      ]);
    }
  };

  // Handle selection of a reply option
  const handleOptionSelect = (option) => {
    setMessages(prev => [...prev, { text: option, type: 'user' }]);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      handleBotResponse();
    }, 1000);
  };

  // Generate reply options based on the conversation state
  const getReplyOptions = () => {
    const lastBotMessage = [...messages].reverse().find(m => m.type === 'bot');
    
    if (!lastBotMessage) return [];
    
    if (lastBotMessage.text === 'You\'re the one playing this quiz on Valentine\'s Day!') {
      return ['Summoned you?'];
    } else if (lastBotMessage.text === 'Your love life is my job!!') {
      return ['Oh really? Clearly you need to work harder'];
    } else if (lastBotMessage.text === 'lol idk what ur talking abt') {
      return ['*Open*', 'Who are you?!'];
    }
    
    return [];
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50">
      {/* Chat header */}
      <div className="bg-pink-200 p-4 rounded-t-lg text-center font-bold text-gray-800">
        {chatTitle}
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`${
              message.type === 'user' 
                ? 'bg-blue-200 ml-auto' 
                : 'bg-gray-200 mr-auto'
            } rounded-lg p-3 max-w-xs break-words`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Reply options */}
      <div className="space-y-2 p-2">
        {getReplyOptions().map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option)}
            className="w-full bg-pink-200 p-2 rounded-lg text-left text-gray-800"
          >
            {option}
          </button>
        ))}
      </div>
      
      {/* Input area */}
      <div className="p-2 border-t flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg mr-2"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button 
          onClick={handleSendMessage}
          className="bg-pink-500 text-white p-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Section1;