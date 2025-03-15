import React, { useState, useRef, useEffect } from 'react';
import './Section1_shapes.css';

export function Section1() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatTitle, setChatTitle] = useState('LucidLives');
  const [currentOptions, setCurrentOptions] = useState([]);
  const [conversationStage, setConversationStage] = useState('initial');
  const messagesEndRef = useRef(null);

  // Initial messages for the chat
  useEffect(() => {
    const initialMessages = [
      { text: 'hey', type: 'bot' },
    ];

    setMessages(initialMessages);

    // Add a slight delay before showing the second message
    setTimeout(() => {
      setMessages(prev => [...prev,
        { text: 'are you still up?', type: 'bot' }
      ]);
      setCurrentOptions([
        "yeah, what's up?",
        "no… 😴",
        "Yeah… I just can't fall asleep"
      ]);
      setConversationStage('areyouup');
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

    // Clear options after user manually types a message
    setCurrentOptions([]);

    // Process custom user input (optional feature)
    setTimeout(() => {
      setMessages(prev => [...prev,
        { text: "Sorry, I didn't quite get that. Can you select one of the options?", type: 'bot' }
      ]);
      // Restore options based on current conversation stage
      updateOptionsBasedOnStage();
    }, 1000);
  };

  // Update available options based on conversation stage
  const updateOptionsBasedOnStage = () => {
    switch (conversationStage) {
      case 'areyouup':
        setCurrentOptions([
          "yeah, what's up?",
          "no… 😴",
          "Yeah… I just can't fall asleep"
        ]);
        break;
      case 'scared':
        setCurrentOptions([
          "yeah, me too"
        ]);
        break;
      case 'picked-major':
        setCurrentOptions([
          "i don't know if i picked the right major to study",
          "i don't know what i'm gonna do afterwards",
          "i'm scared of losing you",
          "i'm gonna miss all my friends"
        ]);
        break;
      case 'not-worried':
        setCurrentOptions([
          "hmm, i guess? I just want to get a decent-paying job",
          "i'm just really excited for what's to come",
          "honestly, i have nothing to lose",
          "as long as you're here, i'm sure things will be fine"
        ]);
        break;
      case 'getting-late':
        setCurrentOptions([
          "i needed this too",
          "np, get some rest",
          ""
        ]);
        break;
      default:
        setCurrentOptions([]);
    }
  };

  // Handle selection of a reply option
  const handleOptionSelect = (option) => {
    // Add user's selected option to messages
    setMessages(prev => [...prev, { text: option, type: 'user' }]);
    
    // Clear options temporarily
    setCurrentOptions([]);

    // Process the selected option after a short delay
    setTimeout(() => {
      processSelectedOption(option);
    }, 1000);
  };

  // Process the selected option and continue conversation
  const processSelectedOption = (option) => {
    switch (option) {
      case "yeah, what's up?":
        continueToOverthinking();
        break;
      case "no… 😴":
        setMessages(prev => [...prev,
          { text: "WELL THEN WAKE UP 🔔 ⏰", type: 'bot' },
          { text: "jk haha", type: 'bot' }
        ]);
        setTimeout(() => continueToOverthinking(), 1500);
        break;
      case "Yeah… I just can't fall asleep":
        setMessages(prev => [...prev,
          { text: "haha, yeah me too", type: 'bot' }
        ]);
        setTimeout(() => continueToOverthinking(), 1500);
        break;
      case "yeah, me too":
        setConversationStage('picked-major');
        updateOptionsBasedOnStage();
        break;
      case "i don't know if i picked the right major to study":
        // This branch is incomplete in the script, adding a reasonable response
        setMessages(prev => [...prev,
          { text: "I ask myself that all the time... It's scary to think about", type: 'bot' }
        ]);
        setTimeout(() => concludeConversation(), 1500);
        break;
      case "i don't know what i'm gonna do afterwards":
        setMessages(prev => [...prev,
          { text: "yeah me too..", type: 'bot' }
        ]);
        setTimeout(() => concludeConversation(), 1500);
        break;
      case "i'm scared of losing you":
        setMessages(prev => [...prev,
          { text: "aww, thanks :3", type: 'bot' },
          { text: "i'm scared of losing you too", type: 'bot' }
        ]);
        setTimeout(() => concludeConversation(), 1500);
        break;
      case "i'm gonna miss all my friends":
        setMessages(prev => [...prev,
          { text: "me too!", type: 'bot' },
          { text: "i'm not that good at keeping in touch…", type: 'bot' }
        ]);
        setTimeout(() => concludeConversation(), 1500);
        break;
      case "i'm not too worried":
        setMessages(prev => [...prev,
          { text: "Really? Wow, you must have things sorted out huh", type: 'bot' }
        ]);
        setConversationStage('not-worried');
        setTimeout(() => updateOptionsBasedOnStage(), 1500);
        break;
      case "hmm, i guess? I just want to get a decent-paying job":
        setTimeout(() => concludeConversation(), 1000);
        break;
      case "i'm just really excited for what's to come":
        setTimeout(() => concludeConversation(), 1000);
        break;
      case "honestly, i have nothing to lose":
        setMessages(prev => [...prev,
          { text: "hey!", type: 'bot' },
          { text: "You have me…", type: 'bot' }
        ]);
        setTimeout(() => concludeConversation(), 1500);
        break;
      case "as long as you're here, i'm sure things will be fine":
        setMessages(prev => [...prev,
          { text: "aww, thanks :3", type: 'bot' },
          { text: "ofc i'll be here", type: 'bot' }
        ]);
        setTimeout(() => concludeConversation(), 1500);
        break;
      case "i needed this too":
      case "np, get some rest":
      case "":
        // Final messages
        setMessages(prev => [...prev,
          { text: "goodnight! 💤", type: 'bot' }
        ]);
        setCurrentOptions([]);
        break;
      default:
        // Handle unexpected options
        setCurrentOptions([]);
    }
  };

  // Continue to overthinking part of conversation
  const continueToOverthinking = () => {
    setMessages(prev => [...prev,
      { text: "i've just been overthinking everything…", type: 'bot' },
      { text: "grad is coming up and i'm really scared", type: 'bot' }
    ]);
    setCurrentOptions(["yeah, me too", "i'm not too worried"]);
    setConversationStage('scared');
  };

  // Conclude the conversation
  const concludeConversation = () => {
    setMessages(prev => [...prev,
      { text: "ah, it's getting late. I should probably try to sleep now", type: 'bot' },
      { text: "thanks for talking with me, i really needed this", type: 'bot' }
    ]);
    setCurrentOptions(["i needed this too", "np, get some rest", ""]);
    setConversationStage('getting-late');
  };

  return (
    <>
      <label>Section 1</label>
      <div className="phone-container">
        <div className="phone-base">
          <div className="screen">
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
                    className={`${message.type === 'user'
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
                {currentOptions.map((option, index) => (
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

              Copyright notice
              <div className="text-xs text-center p-2 text-gray-500">
                all artwork is copyrighted. please don't use it without permission
                <br />
                © 2025 I-see What You Did There
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}