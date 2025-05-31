// import React, { useState, useRef, useEffect } from "react";
// import { Mic, Keyboard, Sun, Moon } from "lucide-react";
// import "../index.css";

// const NGROK_URL = "https://9aa9-34-125-208-203.ngrok-free.app";

// const ChatPage = () => {
//   const [inputMode, setInputMode] = useState("text");
//   const [inputText, setInputText] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [language, setLanguage] = useState("English");
//   const [showSettings, setShowSettings] = useState(false);
//   const [showLanguageOptions, setShowLanguageOptions] = useState(false);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [darkMode, setDarkMode] = useState(true);

//   const recognitionRef = useRef(null);
//   const isRecordingRef = useRef(false);

//   const handleVoiceInputStart = () => {
//     if (isRecordingRef.current) return;
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Speech Recognition is not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = language === "English" ? "en-US" : "te-IN";

//     recognition.onresult = async (event) => {
//       const transcript = event.results[0][0].transcript;
//       const newMsg = { sender: "user", text: transcript };
//       setMessages((prev) => [...prev, newMsg]);

//       try {
//         const response = await fetch(`${NGROK_URL}/generate`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ question: transcript }),
//         });

//         const data = await response.json();
//         const botReply = {
//           sender: "bot",
//           text: data.answer || (language === "English"
//             ? "I'm not sure how to respond to that 🤖"
//             : "దానికి ఎలా స్పందించాలో నాకు తెలియదు 🤖"),
//         };

//         setMessages((prev) => [...prev, botReply]);
//       } catch (err) {
//         console.error("Error:", err);
//         const errorMsg = {
//           sender: "bot",
//           text: language === "English"
//             ? "Oops! Something went wrong connecting to Travis' brain 🧠"
//             : "త్రావిస్ మెదడు కి కనెక్ట్ అయ్యే లోపం జరిగింది 🧠",
//         };
//         setMessages((prev) => [...prev, errorMsg]);
//       }
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//     isRecordingRef.current = true;
//   };

//   const handleVoiceInputStop = () => {
//     if (!isRecordingRef.current) return;
//     recognitionRef.current.stop();
//     isRecordingRef.current = false;
//   };

//   const handleSendText = async () => {
//     if (inputText.trim()) {
//       const newMsg = { sender: "user", text: inputText.trim() };
//       setMessages((prev) => [...prev, newMsg]);

//       try {
//         const response = await fetch(`${NGROK_URL}/generate`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ question: inputText.trim() }),
//         });

//         const data = await response.json();
//         const botReply = {
//           sender: "bot",
//           text: data.answer || (language === "English"
//             ? "I'm not sure how to respond to that 🤖"
//             : "దానికి ఎలా స్పందించాలో నాకు తెలియదు 🤖"),
//         };

//         setMessages((prev) => [...prev, botReply]);
//       } catch (err) {
//         console.error("Error:", err);
//         const errorMsg = {
//           sender: "bot",
//           text: language === "English"
//             ? "Oops! Something went wrong connecting to Travis' brain 🧠"
//             : "త్రావిస్ మెదడు కి కనెక్ట్ అయ్యే లోపం జరిగింది 🧠",
//         };
//         setMessages((prev) => [...prev, errorMsg]);
//       }

//       setInputText("");
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Space") {
//       setInputMode("voice");
//       handleVoiceInputStart();
//     }
//   };

//   const handleKeyUp = (e) => {
//     if (e.key === "Space") {
//       setInputMode("text");
//       handleVoiceInputStop();
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//     };
//   }, []);

//   const languages = ["English", "Telugu"];

//   const handleSelectChat = (chat) => {
//     setSelectedChat(chat);
//   };

//   const startNewChat = () => {
//     if (messages.length > 0) {
//       setChatHistory((prev) => [...prev, messages]);
//     }
//     setMessages([]);
//     setSelectedChat(null);
//   };

//   const clearAllChats = () => {
//     setChatHistory([]);
//     setMessages([]);
//     setSelectedChat(null);
//   };

//   return (
//     <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen transition-colors`}>
//     <div className="w-full text-center py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white text-2xl font-bold tracking-wide shadow-md z-50">
//       TRAVIS – {language === "English" ? "Your Smart AI Assistant" : "మీ సమర్థ AI సహాయకుడు"}
//     </div>

//     {/* [ UI CONTINUES ] — Unchanged rendering logic and design from your code */}
//     {/* No need to paste full HTML again — only logic integration was changed */}
//     <div className="flex p-4">
//       {/* Sidebar */}
//       <div className={`w-1/5 hidden md:flex flex-col border rounded-xl p-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} mr-4`}>
//         <h2 className="text-xl font-bold mb-4">{language === "English" ? "Dashboard" : "డాష్‌బోర్డ్"}</h2>

//         {/* New Chat */}
//         <button
//           onClick={startNewChat}
//           className="mb-4 px-4 py-2 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full hover:scale-105 transition"
//         >
//           {language === "English" ? "New Chat" : "కొత్త చాట్"}
//         </button>

//        {/* Chat History */}
//         <div className="mb-4">
//           <h3 className="font-semibold mb-2">{language === "English" ? "Chat History" : "చాట్ చరిత్ర"}</h3>
//           <ul className="space-y-2">
//             {chatHistory.map((chat, idx) => (
//               <li
//                 key={idx}
//                 onClick={() => handleSelectChat(chat)}
//                 className={`cursor-pointer px-3 py-2 rounded-md text-sm ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
//               >
//                 {language === "English" ? `Chat ${idx + 1}` : `చాట్ ${idx + 1}`}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Clear Chat */}
//         <button
//           onClick={clearAllChats}
//           className="mt-auto w-full px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-full hover:scale-105 transition"
//         >
//           {language === "English" ? "Clear All Chats" : "అన్ని చాట్లు క్లియర్ చేయి"}
//         </button>

//         {/* Settings & Language */}
//         <div className="mt-6 space-y-4">
//           <div
//             className="hover:text-pink-400 cursor-pointer relative"
//             onClick={() => setShowSettings((prev) => !prev)}
//           >
//             {language === "English" ? "Settings" : "సెట్టింగ్‌లు"}
//             {showSettings && (
//               <div className="absolute left-24 top-0 bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4 w-40 z-10 shadow-lg space-y-2 text-sm">
//                 <div
//                   onClick={() => setDarkMode((prev) => !prev)}
//                   className="cursor-pointer hover:text-pink-400 flex items-center gap-2"
//                 >
//                   {darkMode ? <Sun size={16} /> : <Moon size={16} />}
//                   {darkMode ? "Light Mode" : "Dark Mode"}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div
//             className="hover:text-pink-400 cursor-pointer relative"
//             onClick={() => setShowLanguageOptions((prev) => !prev)}
//           >
//             {language === "English" ? "Language" : "భాష"}
//             {showLanguageOptions && (
//               <div className="absolute left-24 top-0 bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4 w-40 z-10 shadow-lg space-y-2 text-sm">
//                 {languages.map((lang, idx) => (
//                   <p
//                     key={idx}
//                     className={`cursor-pointer hover:text-pink-300 ${lang === language ? "font-bold text-pink-400" : ""}`}
//                     onClick={() => {
//                       setLanguage(lang);
//                       setShowLanguageOptions(false);
//                     }}
//                   >
//                     {lang}
//                   </p>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Chat Box */}
//       <div className={`flex-1 border rounded-xl p-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
//         {/* Mode Toggle */}
//         <div className="flex justify-center gap-4 mb-6">
//           <button
//             onClick={() => setInputMode("text")}
//             className={`px-5 py-2 rounded-full font-semibold ${inputMode === "text" ? "bg-gradient-to-r from-green-400 to-blue-500 text-white" : "bg-gray-300"}`}>
//             <Keyboard size={18} className="inline mr-2" /> {language === "English" ? "Text" : "పాఠం"}
//           </button>
//           <button
//             onClick={() => setInputMode("voice")}
//             className={`px-5 py-2 rounded-full font-semibold ${inputMode === "voice" ? "bg-gradient-to-r from-green-400 to-blue-500 text-white" : "bg-gray-300"}`}
//           >
//             <Mic size={18} className="inline mr-2" /> {language === "English" ? "Voice" : "వాయిస్"}
//           </button>
//         </div>

//         {/* Messages */}
//         <div className="h-[400px] overflow-y-auto space-y-4 pr-2 mb-6">
//           {(selectedChat || messages).map((msg, idx) => (
//             <div
//               key={idx}
//               className={`max-w-[70%] px-4 py-3 rounded-2xl text-base ${msg.sender === "user" ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-gray-200 text-black"}`}
//             >
//               {msg.text}
//             </div>
//           ))}
//         </div>

//         {/* Text Input */}
//         {inputMode === "text" && (
//           <div className="flex items-center gap-3">
//             <input
//               type="text"
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSendText()}
//               className="flex-1 p-3 rounded-2xl bg-gray-100 text-black placeholder-gray-500 outline-none"
//               placeholder={language === "English" ? "Type your message..." : "మీ సందేశాన్ని టైప్ చేయండి..."}
//             />
//             <button
//               onClick={handleSendText}
//               className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-2xl font-semibold hover:scale-105 transition"
//             >
//               {language === "English" ? "Send" : "పంపు"}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Robot Image */}
//       <div className="w-1/5 p-4 ml-4 hidden md:block relative">
//         <div className="absolute bottom-0 right-0 w-full flex justify-end">
//           <img src="/robot.png" alt="Robot" className="w-full max-w-[250px]" />
//         </div>
//       </div>
//     </div>
//   </div>

//   );
// };

// export default ChatPage;


import React, { useState, useRef, useEffect } from "react";
import "./ChatPage.css";
import {
  Mic,
  Keyboard,
  Sun,
  Moon,
  History,
  Info,
  ListChecks as Category,
  Accessibility,
  HelpCircle,
  Trash,
  Plus,
  Send,
  HandPlatter as Translate,
  X,
  User,
  BotMessageSquare,
  ChevronLeft,
  ChevronRight,
  Command,
  Play,
  Pause,
} from "lucide-react";

const NGROK_URL = "https://fb25-35-240-245-249.ngrok-free.app";

const ChatPage = () => {
  const [inputMode, setInputMode] = useState("text");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      title: "Banking Procedures",
      date: "May 2, 2025",
      messages: [
        { sender: "user", text: "What are the steps to open a savings account?" },
        {
          sender: "bot",
          text: "To open a savings account, you typically need to: 1) Choose a bank, 2) Gather your identification documents (ID, address proof, etc.), 3) Fill out an application form, 4) Make an initial deposit, and 5) Set up your online banking access. Would you like more details about any of these steps?",
        },
      ],
    },
    {
      id: 2,
      title: "Loan Information",
      date: "May 1, 2025",
      messages: [
        { sender: "user", text: "What documents do I need for a home loan?" },
        {
          sender: "bot",
          text: "For a home loan, you'll need: ID proof, address proof, income proof (salary slips or tax returns), employment confirmation, bank statements, property documents, and loan application form. Different banks may have additional requirements. Would you like specific information about any of these documents?",
        },
      ],
    },
  ]);
  const [language, setLanguage] = useState("English");
  const [showSettings, setShowSettings] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [rightSidebarContent, setRightSidebarContent] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const [hasPreviousMessage, setHasPreviousMessage] = useState(false);
  const [hasNextMessage, setHasNextMessage] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportFormat, setExportFormat] = useState("markdown");
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [includeMetadata, setIncludeMetadata] = useState(false);
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [fontSize, setFontSize] = useState("text-base");
  const [fontSizeValue, setFontSizeValue] = useState(2);
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largeFont: false,
    reducedMotion: false,
    screenReader: false,
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const recognitionRef = useRef(null);
  const isRecordingRef = useRef(false);
  const messagesEndRef = useRef(null);
  const speechSynthRef = useRef(null);
  const utteranceRef = useRef(null);

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const toggleAccessibilitySetting = (setting) => {
    setAccessibilitySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSend = async () => {
    if (input.trim()) {
      const newMsg = { sender: "user", text: input.trim() };
      setMessages((prev) => [...prev, newMsg]);

      try {
        const response = await fetch(`${NGROK_URL}/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: input.trim() }),
        });

        const data = await response.json();
        const botReply = {
          sender: "bot",
          text: data.answer || (language === "English"
            ? "I'm not sure how to respond to that 🤖"
            : "దానికి ఎలా స్పందించాలో నాకు తెలియదు 🤖"),
        };
        // Play audio if available
        if (data.audio_base64) {
          const audioSrc = `data:audio/mp3;base64,${data.audio_base64}`;
          const audio = new Audio(audioSrc);
          audio.play();
        }
        const updatedMessages = [...messages, newMsg, botReply];
        setMessages(updatedMessages);

        if (selectedChat === null && messages.length === 0) {
          const newChatId = chatHistory.length + 1;
          const newChat = {
            id: newChatId,
            title: input.trim().substring(0, 30) + (input.trim().length > 30 ? "..." : ""),
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            messages: updatedMessages,
          };
          setChatHistory((prev) => [...prev, newChat]);
          setSelectedChat(newChatId);
        } else if (selectedChat !== null) {
          setChatHistory((prev) =>
            prev.map((chat) =>
              chat.id === selectedChat ? { ...chat, messages: updatedMessages } : chat
            )
          );
        }
      } catch (err) {
        console.error("Error:", err);
        const errorMsg = {
          sender: "bot",
          text: language === "English"
            ? "Oops! Something went wrong connecting to Travis' brain 🧠"
            : "త్రావిస్ మెదడు కి కనెక్ట్ అయ్యే లోపం జరిగింది 🧠",
        };
        const updatedMessages = [...messages, newMsg, errorMsg];
        setMessages(updatedMessages);

        if (selectedChat === null && messages.length === 0) {
          const newChatId = chatHistory.length + 1;
          const newChat = {
            id: newChatId,
            title: input.trim().substring(0, 30) + (input.trim().length > 30 ? "..." : ""),
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            messages: updatedMessages,
          };
          setChatHistory((prev) => [...prev, newChat]);
          setSelectedChat(newChatId);
        } else if (selectedChat !== null) {
          setChatHistory((prev) =>
            prev.map((chat) =>
              chat.id === selectedChat ? { ...chat, messages: updatedMessages } : chat
            )
          );
        }
      }

      setInput("");
    }
  };

  const handleVoiceInputStart = () => {
    if (isRecordingRef.current) return;
    // Pause speech synthesis if active
    if (speechSynthRef.current && isPlaying) {
      speechSynthRef.current.pause();
      setIsPlaying(false);
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(language === "English" ? "Speech recognition is not supported in this browser." : "ఈ బ్రౌజర్‌లో స్పీచ్ రికగ్నిషన్ సపోర్ట్ చేయబడదు.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === "English" ? "en-US" : "te-IN";

    recognition.onresult = async (event) => {
  const transcript = event.results[0][0].transcript;
  const newMsg = { sender: "user", text: transcript };
  setMessages((prev) => [...prev, newMsg]);

  try {
    const response = await fetch(`${NGROK_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: transcript }),
    });

    const data = await response.json();

    // Get the bot's text reply
    const botText = data.answer || (
      language === "English"
        ? "I'm not sure how to respond to that 🤖"
        : "దానికి ఎలా స్పందించాలో నాకు తెలియదు 🤖"
    );

    // Play audio if available
    if (data.audio_base64) {
      const audioSrc = `data:audio/mp3;base64,${data.audio_base64}`;
      const audio = new Audio(audioSrc);
      audio.play();
    }

    const botReply = { sender: "bot", text: botText };
    const updatedMessages = [...messages, newMsg, botReply];
    setMessages(updatedMessages);
        if (selectedChat === null && messages.length === 0) {
          const newChatId = chatHistory.length + 1;
          const newChat = {
            id: newChatId,
            title: transcript.substring(0, 30) + (transcript.length > 30 ? "..." : ""),
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            messages: updatedMessages,
          };
          setChatHistory((prev) => [...prev, newChat]);
          setSelectedChat(newChatId);
        } else if (selectedChat !== null) {
          setChatHistory((prev) =>
            prev.map((chat) =>
              chat.id === selectedChat ? { ...chat, messages: updatedMessages } : chat
            )
          );
        }
      } catch (err) {
        console.error("Error:", err);
        const errorMsg = {
          sender: "bot",
          text: language === "English"
            ? "Oops! Something went wrong connecting to Travis' brain 🧠"
            : "త్రావిస్ మెదడు కి కనెక్ట్ అయ్యే లోపం జరిగింది 🧠",
        };
        const updatedMessages = [...messages, newMsg, errorMsg];
        setMessages(updatedMessages);

        if (selectedChat === null && messages.length === 0) {
          const newChatId = chatHistory.length + 1;
          const newChat = {
            id: newChatId,
            title: transcript.substring(0, 30) + (transcript.length > 30 ? "..." : ""),
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            messages: updatedMessages,
          };
          setChatHistory((prev) => [...prev, newChat]);
          setSelectedChat(newChatId);
        } else if (selectedChat !== null) {
          setChatHistory((prev) =>
            prev.map((chat) =>
              chat.id === selectedChat ? { ...chat, messages: updatedMessages } : chat
            )
          );
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error !== "no-speech") {
        alert(language === "English" ? "Speech recognition error: " + event.error : "స్పీచ్ రికగ్నిషన్ లోపం: " + event.error);
      }
      handleVoiceInputStop();
    };

    recognition.start();
    recognitionRef.current = recognition;
    isRecordingRef.current = true;
    setIsListening(true);
  };

  const handleVoiceInputStop = () => {
    if (!isRecordingRef.current) return;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      isRecordingRef.current = false;
      setIsListening(false);
    }
  };

  const handleTranslate = () => {
    if (input.trim()) {
      const translatedText = language === "English" ? "తెలుగులో అనువాదం: " + input.trim() : "English translation: " + input.trim();
      setInput(translatedText);
    } else {
      alert(
        language === "English"
          ? "Please enter text to translate"
          : "దయచేసి అనువదించడానికి వచనాన్ని నమోదు చేయండి"
      );
    }
  };

  const handleFocusModeNavigation = (direction) => {
    if (direction === "prev" && hasPreviousMessage) {
      setCurrentMessageIndex((prev) => {
        const newIndex = prev - 1;
        setCurrentMessage(messages[newIndex]);
        setHasPreviousMessage(newIndex > 0);
        setHasNextMessage(true);
        return newIndex;
      });
    } else if (direction === "next" && hasNextMessage) {
      setCurrentMessageIndex((prev) => {
        const newIndex = prev + 1;
        setCurrentMessage(messages[newIndex]);
        setHasPreviousMessage(true);
        setHasNextMessage(newIndex < totalMessages - 1);
        return newIndex;
      });
    }
  };

  const handleFontSizeChange = (e) => {
    const value = parseInt(e.target.value);
    setFontSizeValue(value);
    if (value === 1) setFontSize("text-sm");
    else if (value === 2) setFontSize("text-base");
    else setFontSize("text-xl");
  };

  const adjustFontSize = (direction) => {
    if (direction === "increase" && fontSize !== "text-xl") {
      if (fontSize === "text-sm") {
        setFontSize("text-base");
        setFontSizeValue(2);
      } else {
        setFontSize("text-xl");
        setFontSizeValue(3);
      }
    } else if (direction === "decrease" && fontSize !== "text-sm") {
      if (fontSize === "text-xl") {
        setFontSize("text-base");
        setFontSizeValue(2);
      } else {
        setFontSize("text-sm");
        setFontSizeValue(1);
      }
    }
  };

  const handleExportChat = () => {
    let exportContent = "";
    const timestamp = new Date().toISOString();
    if (exportFormat === "markdown") {
      exportContent = messages
        .map((msg) => {
          const ts = includeTimestamps ? `[${timestamp}] ` : "";
          return `## ${ts}${msg.sender === "user" ? "You" : "Travis"}\n\n${msg.text}\n\n`;
        })
        .join("---\n\n");
    } else if (exportFormat === "txt") {
      exportContent = messages
        .map((msg) => {
          const ts = includeTimestamps ? `[${timestamp}] ` : "";
          return `${ts}${msg.sender === "user" ? "You" : "Travis"}: ${msg.text}`;
        })
        .join("\n\n");
    } else if (exportFormat === "json") {
      const exportData = {
        conversation: messages.map((msg) => ({
          sender: msg.sender,
          text: msg.text,
          ...(includeTimestamps && { timestamp }),
        })),
        ...(includeMetadata && {
          metadata: {
            exportDate: new Date().toISOString(),
            totalMessages: messages.length,
          },
        }),
      };
      exportContent = JSON.stringify(exportData, null, 2);
    }
    const blob = new Blob([exportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `travis-chat-${new Date().toISOString().slice(0, 10)}.${exportFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportDialog(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize speech synthesis
  useEffect(() => {
    speechSynthRef.current = window.speechSynthesis;
    return () => {
      if (utteranceRef.current && speechSynthRef.current) {
        speechSynthRef.current.cancel();
      }
    };
  }, []);

  // Get the latest bot message for reading aloud
  const generatedText = messages.filter((msg) => msg.sender === "bot").slice(-1)[0]?.text || "";

  // Handle play/pause text reading
  const toggleSpeech = () => {
    if (!generatedText) {
      alert(language === "English" ? "No bot response to read aloud." : "చదవడానికి బాట్ స్పందన లేదు.");
      return;
    }
    // Stop voice input if active
    if (isListening) {
      handleVoiceInputStop();
    }
    if (isPlaying) {
      // Pause speech
      if (speechSynthRef.current) {
        speechSynthRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      // If already paused, resume
      if (speechSynthRef.current && speechSynthRef.current.paused) {
        speechSynthRef.current.resume();
        setIsPlaying(true);
        return;
      }
      // Start new speech
      utteranceRef.current = new SpeechSynthesisUtterance(generatedText);
      utteranceRef.current.lang = language === "English" ? "en-US" : "te-IN";
      utteranceRef.current.onend = () => {
        setIsPlaying(false);
      };
      utteranceRef.current.onerror = () => {
        setIsPlaying(false);
      };
      speechSynthRef.current.cancel();
      speechSynthRef.current.speak(utteranceRef.current);
      setIsPlaying(true);
    }
  };

  // Reset speech when generated text changes
  useEffect(() => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
      setIsPlaying(false);
    }
  }, [generatedText]);

  const startNewChat = () => {
    setMessages([]);
    setSelectedChat(null);
    setInput("");
    setShowRightSidebar(false);
  };

  const clearAllChats = () => {
    if (
      window.confirm(
        language === "English"
          ? "Are you sure you want to clear all chat history?"
          : "మీరు ఖచ్చితంగా మొత్తం చాట్ చరిత్రను క్లియర్ చేయాలనుకుంటున్నారా?"
      )
    ) {
      setChatHistory([]);
      setMessages([]);
      setSelectedChat(null);
    }
  };

  const loadChat = (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setSelectedChat(chatId);
    }
  };

  const deleteChat = (chatId, event) => {
    event.stopPropagation();
    if (
      window.confirm(
        language === "English"
          ? "Are you sure you want to delete this chat?"
          : "మీరు ఖచ్చితంగా ఈ చాట్‌ను తొలగించాలనుకుంటున్నారా?"
      )
    ) {
      setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
      if (selectedChat === chatId) {
        setMessages([]);
        setSelectedChat(null);
      }
    }
  };

  const handleSidebarOptionClick = (option) => {
    switch (option) {
      case "history":
        setRightSidebarContent("history");
        break;
      case "meetTravis":
        setRightSidebarContent("meetTravis");
        break;
      case "categories":
        setRightSidebarContent("categories");
        break;
      case "accessibility":
        setRightSidebarContent("accessibility");
        break;
      case "howToUse":
        setRightSidebarContent("howToUse");
        break;
      default:
        return;
    }
    setShowRightSidebar(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && e.ctrlKey && !e.repeat) {
        e.preventDefault();
        isListening ? handleVoiceInputStop() : handleVoiceInputStart();
      }
      if (e.ctrlKey && e.code === "KeyT") {
        e.preventDefault();
        handleTranslate();
      }
      if (e.ctrlKey && e.code === "KeyN") {
        e.preventDefault();
        startNewChat();
      }
      if (e.code === "Escape" && showRightSidebar) {
        setShowRightSidebar(false);
      }
      if (e.shiftKey && e.code === "Slash") {
        e.preventDefault();
        setShowShortcutsHelp((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isListening, showRightSidebar]);

  const getThemeClass = (element) => {
    const baseClasses = {
      app: `min-h-screen transition-colors ${accessibilitySettings.reducedMotion ? "transition-none" : ""}`,
      sidebar: "rounded-lg shadow-lg p-4 transition-all",
      button: "rounded-lg transition-all",
      input: "rounded-lg transition-all",
      heading: "",
      text: "",
    };
    if (accessibilitySettings.highContrast) {
      return {
        app: `${baseClasses.app} ${darkMode ? "bg-black text-white" : "bg-white text-black"}`,
        sidebar: `${baseClasses.sidebar} ${darkMode ? "bg-gray-900 border border-white" : "bg-gray-100 border border-black"}`,
        button: `${baseClasses.button} ${darkMode ? "bg-white text-black hover:bg-gray-300" : "bg-black text-white hover:bg-gray-700"}`,
        input: `${baseClasses.input} ${darkMode ? "bg-gray-800 text-white border border-white" : "bg-white text-black border border-black"}`,
        heading: darkMode ? "text-yellow-300" : "text-blue-800",
        text: darkMode ? "text-white" : "text-black",
      };
    } else {
      return {
        app: `${baseClasses.app} ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`,
        sidebar: `${baseClasses.sidebar} ${darkMode ? "bg-gray-800" : "bg-white"}`,
        button: `${baseClasses.button} ${darkMode ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-blue-500 text-white hover:bg-blue-400"}`,
        input: `${baseClasses.input} ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`,
        heading: darkMode ? "text-blue-400" : "text-blue-600",
        text: darkMode ? "text-gray-300" : "text-gray-700",
      };
    }
  };

  const theme = getThemeClass();
  const fontSizeClass = accessibilitySettings.largeFont ? "text-lg" : fontSize;

  const sidebarOptions = [
    { icon: <History size={20} />, label: language === "English" ? "History" : "చరిత్ర", action: () => handleSidebarOptionClick("history") },
    { icon: <Info size={20} />, label: language === "English" ? "Meet TRAVIS" : "TRAVIS ని కలవండి", action: () => handleSidebarOptionClick("meetTravis") },
    { icon: <Category size={20} />, label: language === "English" ? "Categories" : "వర్గాలు", action: () => handleSidebarOptionClick("categories") },
    {
      icon: <Accessibility size={20} />,
      label: language === "English" ? "Accessibility" : "ప్రాప్యత",
      action: () => handleSidebarOptionClick("accessibility"),
    },
    {
      icon: <HelpCircle size={20} />,
      label: language === "English" ? "How to Use" : "ఎలా ఉపయోగించాలి",
      action: () => handleSidebarOptionClick("howToUse"),
    },
  ];

  const renderRightSidebarContent = () => {
    switch (rightSidebarContent) {
      case "history":
        return (
          <div className={`${fontSizeClass} p-4`}>
            <h2 className={`text-xl font-bold mb-4 ${theme.heading}`}>
              {language === "English" ? "Chat History" : "చాట్ చరిత్ర"}
            </h2>
            {chatHistory.length > 0 ? (
              <div className="space-y-2">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => loadChat(chat.id)}
                    className={`p-3 ${selectedChat === chat.id ? "border-l-4 border-blue-500" : ""} ${theme.input} cursor-pointer flex justify-between items-center`}
                  >
                    <div className="flex-1">
                      <p className="font-medium truncate">{chat.title}</p>
                      <p className="text-sm opacity-70">{chat.date}</p>
                    </div>
                    <button
                      onClick={(e) => deleteChat(chat.id, e)}
                      className="p-1 rounded-full hover:bg-red-500 hover:text-white"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`${theme.text} italic`}>
                {language === "English" ? "No chat history yet." : "ఇంకా చాట్ చరిత్ర లేదు."}
              </p>
            )}
            {chatHistory.length > 0 && (
              <button
                onClick={clearAllChats}
                className={`mt-4 flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600`}
              >
                <Trash size={16} />
                {language === "English" ? "Clear All Chats" : "అన్ని చాట్‌లను క్లియర్ చేయండి"}
              </button>
            )}
          </div>
        );
      case "meetTravis":
        return (
          <div className={`${fontSizeClass} p-4`}>
            <h2 className={`text-xl font-bold mb-4 ${theme.heading}`}>
              {language === "English" ? "Meet TRAVIS" : "TRAVIS ని కలవండి"}
            </h2>
            <div className="space-y-4">
              <p className={theme.text}>
                {language === "English"
                  ? "TRAVIS (TRansformer based Application for Visually Impaired Service Agents) is your smart AI assistant designed to help with banking queries,local information to cards in both English and Telugu."
                  : "TRAVIS (తెలంగాణ రెస్పాన్సివ్ ఆటోమేటెడ్ వర్చువల్ ఇంటర్‌ఫేస్ సిస్టమ్) మీ స్మార్ట్ AI సహాయకుడు, బ్యాంకింగ్ ప్రశ్నలు, ప్రభుత్వ సేవలు మరియు స్థానిక సమాచారంలో సహాయపడటానికి ఇంగ్లీష్ మరియు తెలుగు రెండింటిలో రూపొందించబడింది."}
              </p>
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 dark:text-blue-300">
                  {language === "English" ? "Key Features:" : "ముఖ్య ఫీచర్లు:"}
                </h3>
                <ul className="list-disc list-inside mt-2 space-y-1 text-blue-700 dark:text-blue-200">
                  <li>{language === "English" ? "Bilingual support (English & Telugu)" : "ద్విభాషా మద్దతు (ఇంగ్లీష్ & తెలుగు)"}</li>
                  <li>{language === "English" ? "Voice input and read aloud capability" : "వాయిస్ ఇన్‌పుట్ మరియు బిగ్గరగా చదవడం సామర్థ్యం"}</li>
                  <li>{language === "English" ? "Accessibility features" : "ప్రాప్యత ఫీచర్లు"}</li>
                  <li>{language === "English" ? "Banking procedure guidance" : "బ్యాంకింగ్ విధాన మార్గదర్శకత్వం"}</li>
                  <li>{language === "English" ? "Government scheme information" : "ప్రభుత్వ పథకం సమాచారం"}</li>
                </ul>
              </div>
              <p className={theme.text}>
                {language === "English"
                  ? "TRAVIS is developed to bridge the digital divide and make essential services more accessible to all bank customers."
                  : "TRAVIS అనేది డిజిటల్ విభజనను పరిష్కరించడానికి మరియు తెలంగాణలోని అన్ని పౌరులకు అవసరమైన సేవలను మరింత అందుబాటులో ఉంచడానికి అభివృద్ధి చేయబడింది."}
              </p>
            </div>
          </div>
        );
      case "categories":
        return (
          <div className={`${fontSizeClass} p-4`}>
            <h2 className={`text-xl font-bold mb-4 ${theme.heading}`}>
              {language === "English" ? "Categories" : "వర్గాలు"}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { title: language === "English" ? "Account Management" : "బ్యాంకింగ్", icon: "💰" },
                { title: language === "English" ? "Card Issues" : "ప్రభుత్వ పథకాలు", icon: "🏛" },
                { title: language === "English" ? "Payments & Transfer" : "వ్యవసాయం", icon: "🌾" },
                { title: language === "English" ? "Top-Ups & Withdrawals" : "విద్య", icon: "🎓" },
                { title: language === "English" ? "Currency & Exchange" : "ఆరోగ్యం", icon: "🏥" },
                { title: language === "English" ? "General Services &support" : "ఉద్యోగం", icon: "💼" },
              ].map((category, index) => (
                <button key={index} className={`${theme.input} p-4 flex items-center gap-3 hover:shadow-md`}>
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium">{category.title}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case "accessibility":
        return (
          <div className={`${fontSizeClass} p-4`}>
            <h2 className={`text-xl font-bold mb-4 ${theme.heading}`}>
              {language === "English" ? "Accessibility Settings" : "ప్రాప్యత సెట్టింగ్‌లు"}
            </h2>
            <div className="space-y-4">
              <div className={`p-3 ${theme.input}`}>
                <label className="flex items-center justify-between cursor-pointer">
                  <span>{language === "English" ? "High Contrast" : "అధిక కాంట్రాస్ట్"}</span>
                  <input
                    type="checkbox"
                    checked={accessibilitySettings.highContrast}
                    onChange={() => toggleAccessibilitySetting("highContrast")}
                    className="w-5 h-5"
                  />
                </label>
              </div>
              <div className={`p-3 ${theme.input}`}>
                <label className="flex items-center justify-between cursor-pointer">
                  <span>{language === "English" ? "Large Font" : "పెద్ద ఫాంట్"}</span>
                  <input
                    type="checkbox"
                    checked={accessibilitySettings.largeFont}
                    onChange={() => toggleAccessibilitySetting("largeFont")}
                    className="w-5 h-5"
                  />
                </label>
              </div>
              <div className={`p-3 ${theme.input}`}>
                <label className="flex items-center justify-between cursor-pointer">
                  <span>{language === "English" ? "Reduced Motion" : "తగ్గించిన మోషన్"}</span>
                  <input
                    type="checkbox"
                    checked={accessibilitySettings.reducedMotion}
                    onChange={() => toggleAccessibilitySetting("reducedMotion")}
                    className="w-5 h-5"
                  />
                </label>
              </div>
              <div className={`p-3 ${theme.input}`}>
                <label className="flex items-center justify-between cursor-pointer">
                  <span>{language === "English" ? "Screen Reader Support" : "స్క్రీన్ రీడర్ మద్దతు"}</span>
                  <input
                    type="checkbox"
                    checked={accessibilitySettings.screenReader}
                    onChange={() => toggleAccessibilitySetting("screenReader")}
                    className="w-5 h-5"
                  />
                </label>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => setLanguage(language === "English" ? "Telugu" : "English")}
                  className={`w-full ${theme.button} px-4 py-3 flex items-center justify-center gap-2`}
                >
                  <Translate size={18} />
                  {language === "English" ? "Switch to Telugu" : "ఇంగ్లీష్‌కు మారండి"}
                </button>
              </div>
            </div>
          </div>
        );
      case "howToUse":
        return (
          <div className={`${fontSizeClass} p-4`}>
            <h2 className={`text-xl font-bold mb-4 ${theme.heading}`}>
              {language === "English" ? "How to Use TRAVIS" : "TRAVIS ని ఎలా ఉపయోగించాలి"}
            </h2>
            <div className="space-y-4">
              <div className={`p-3 ${theme.input}`}>
                <h3 className="font-bold mb-2">{language === "English" ? "Text Input" : "టెక్స్ట్ ఇన్‌పుట్"}</h3>
                <p className={theme.text}>
                  {language === "English"
                    ? "Type your question in the input box and press Enter or click the Send button."
                    : "ఇన్‌పుట్ బాక్స్‌లో మీ ప్రశ్నను టైప్ చేసి, ఎంటర్ నొక్కండి లేదా పంపు బటన్‌ను క్లిక్ చేయండి."}
                </p>
              </div>
              <div className={`p-3 ${theme.input}`}>
                <h3 className="font-bold mb-2">{language === "English" ? "Voice Input" : "వాయిస్ ఇన్‌పుట్"}</h3>
                <p className={theme.text}>
                  {language === "English"
                    ? "Click the microphone button or press Ctrl+Space to start voice input. Speak clearly and press the button again to stop."
                    : "మైక్రోఫోన్ బటన్‌ను క్లిక్ చేయండి లేదా వాయిస్ ఇన్‌పుట్‌ను ప్రారంభించడానికి Ctrl+Space నొక్కండి. స్పష్టంగా మాట్లాడండి మరియు ఆపడానికి బటన్‌ను మళ్లీ నొక్కండి."}
                </p>
              </div>
              <div className={`p-3 ${theme.input}`}>
                <h3 className="font-bold mb-2">{language === "English" ? "Read Aloud" : "బిగ్గరగా చదవండి"}</h3>
                <p className={theme.text}>
                  {language === "English"
                    ? "Click the play button to read the latest bot response aloud in English or Telugu."
                    : "తాజా బాట్ స్పందనను ఇంగ్లీష్ లేదా తెలుగులో బిగ్గరగా చదవడానికి ప్లే బటన్‌ను క్లిక్ చేయండి."}
                </p>
              </div>
              <div className={`p-3 ${theme.input}`}>
                <h3 className="font-bold mb-2">{language === "English" ? "Keyboard Shortcuts" : "కీబోర్డ్ షార్ట్‌కట్‌లు"}</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">Ctrl+Space</span>:{" "}
                    {language === "English" ? "Toggle voice input" : "వాయిస్ ఇన్‌పుట్‌ని టోగుల్ చేయండి"}
                  </li>
                  <li>
                    <span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">Ctrl+T</span>:{" "}
                    {language === "English" ? "Translate text" : "వచనాన్ని అనువదించండి"}
                  </li>
                  <li>
                    <span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">Ctrl+N</span>:{" "}
                    {language === "English" ? "Start new chat" : "కొత్త చాట్‌ను ప్రారంభించండి"}
                  </li>
                  <li>
                    <span className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">Shift+?</span>:{" "}
                    {language === "English" ? "Show keyboard shortcuts" : "కీబోర్డ్ షార్ట్‌కట్‌లను చూపించు"}
                  </li>
                </ul>
              </div>
              <div className={`p-3 ${theme.input}`}>
                <h3 className="font-bold mb-2">{language === "English" ? "Translation" : "అనువాదం"}</h3>
                <p className={theme.text}>
                  {language === "English"
                    ? "Click the translate button or press Ctrl+T to translate your text between English and Telugu."
                    : "మీ వచనాన్ని ఇంగ్లీష్ మరియు తెలుగు మధ్య అనువదించడానికి అనువాద బటన్‌ను క్లిక్ చేయండి లేదా Ctrl+T నొక్కండి."}
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={theme.app}>
        {/* Keyboard Shortcuts Help Modal */}
        {showShortcutsHelp && (
          <div className="fixed inset-0 fixed-overlay flex items-center justify-center z-50">
            <div className={`shortcuts-modal max-w-md w-full mx-4 ${fontSizeClass}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold shortcuts-heading flex items-center gap-2`}>
                  <Command size={20} />
                  {language === "English" ? "Keyboard Shortcuts" : "కీబోర్డ్ షార్ట్‌కట్‌లు"}
                </h2>
                <button onClick={() => setShowShortcutsHelp(false)} className="close-button">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="keyboard-shortcut-key">Ctrl + Space</div>
                  <div>{language === "English" ? "Toggle voice input" : "వాయిస్ ఇన్‌పుట్‌ని టోగుల్ చేయండి"}</div>
                  <div className="keyboard-shortcut-key">Ctrl + T</div>
                  <div>{language === "English" ? "Translate text" : "వచనాన్ని అనువదించండి"}</div>
                  <div className="keyboard-shortcut-key">Ctrl + N</div>
                  <div>{language === "English" ? "Start new chat" : "కొత్త చాట్‌ను ప్రారంభించండి"}</div>
                  <div className="keyboard-shortcut-key">Enter</div>
                  <div>{language === "English" ? "Send message" : "సందేశాన్ని పంపండి"}</div>
                  <div className="keyboard-shortcut-key">Shift + ?</div>
                  <div>{language === "English" ? "Show/hide this menu" : "ఈ మెను చూపించు/దాచు"}</div>
                  <div className="keyboard-shortcut-key">Escape</div>
                  <div>{language === "English" ? "Close sidebar" : "సైడ్‌బార్‌ను మూసివేయండి"}</div>
                </div>
                <button
                  onClick={() => setShowShortcutsHelp(false)}
                  className="shortcuts-button w-full px-3 py-2 mt-4"
                >
                  {language === "English" ? "Close" : "మూసివేయండి"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="w-full text-center py-4 custom-gradient-primary text-white text-2xl font-bold tracking-wide shadow-md z-50">
          TRAVIS - {language === "English" ? "Your Smart AI Assistant" : "మీ సమర్థ AI సహాయకుడు"}
        </div>

        {/* Main Layout */}
        <div className="flex h-[calc(100vh-72px)]">
          {/* Left Sidebar */}
          <div className={`${showSidebar ? "w-64" : "w-0 opacity-0"} transition-all duration-300 ${theme.sidebar} h-full overflow-y-auto`}>
            <div className="flex flex-col h-full justify-between p-4">
              <div className="space-y-4">
                <button
                  onClick={startNewChat}
                  className="w-full flex items-center gap-2 px-4 py-3 custom-gradient-primary rounded-lg hover:shadow-lg transition-all"
                >
                  <Plus size={20} />
                  {language === "English" ? "New Chat" : "కొత్త చాట్"}
                </button>
                <div className="space-y-2 pt-2">
                  {sidebarOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={option.action}
                      className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                        rightSidebarContent === option.label.toLowerCase().replace(/\s+/g, "")
                          ? "custom-gradient-secondary text-white"
                          : darkMode
                          ? "hover:bg-gray-700 text-gray-300 hover:text-white"
                          : "sidebar-option"
                      }`}
                    >
                      {option.icon}
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2 pt-4 mt-auto">
                <button
                  onClick={() => setDarkMode((prev) => !prev)}
                  className={`w-full flex items-center gap-2 px-4 py-3 ${theme.button}`}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  {darkMode
                    ? language === "English"
                      ? "Light Mode"
                      : "లైట్ మోడ్"
                    : language === "English"
                    ? "Dark Mode"
                    : "డార్క్ మోడ్"}
                </button>
                <button
                  onClick={clearAllChats}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                >
                  <Trash size={20} />
                  {language === "English" ? "Clear All Chats" : "అన్ని చాట్‌లను క్లియర్ చేయండి"}
                </button>
              </div>
            </div>
          </div>

          {/* Toggle sidebar button (mobile) */}
          <button
            onClick={() => setShowSidebar((prev) => !prev)}
            className={`fixed left-0 top-1/2 transform -translate-y-1/2 ${showSidebar ? "ml-64" : "ml-0"} transition-all duration-300 custom-gradient-secondary text-white p-2 rounded-r-md`}
          >
            {showSidebar ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>

          {/* Main Chat Area */}
          <div className={`flex-1 flex flex-col ${showSidebar ? "ml-4" : "ml-2"} ${showRightSidebar ? "mr-4" : "mr-2"} transition-all duration-300`}>
            <div className="flex-1 p-4 overflow-y-auto rounded-t-lg mb-1">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center"></div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "bot" && (
                        <div className={`p-2 rounded-full ${darkMode ? "bg-blue-600" : "bg-blue-400"}`}>
                          <BotMessageSquare size={24} />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          message.sender === "user"
                            ? darkMode
                              ? "bg-blue-700 text-white"
                              : "bg-blue-100 text-blue-900"
                            : darkMode
                            ? "bg-gray-700 text-white"
                            : "bg-white text-gray-900 border border-gray-200"
                        } ${accessibilitySettings.highContrast ? "border-2" : ""}`}
                      >
                        {message.text}
                      </div>
                      {message.sender === "user" && (
                        <div className={`p-2 rounded-full ${darkMode ? "bg-blue-600" : "bg-blue-400"}`}>
                          <User size={24} />
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className={`p-4 ${theme.input} rounded-b-lg flex flex-col md:flex-row items-stretch`}>
              <textarea
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder={language === "English" ? "Ask a question about banking procedures..." : "బ్యాంకింగ్ విధానాల గురించి ప్రశ్న అడగండి..."}
                className={`flex-1 ${theme.input} rounded-lg p-3 min-h-[50px] max-h-[100px] resize-y ${accessibilitySettings.largeFont ? "text-lg" : ""}`}
                aria-label="Ask a question"
              />
              <div className="flex flex-row justify-start md:justify-between items-center ml-2 gap-2 mt-4 md:mt-0">
                <button
                  onClick={isListening ? handleVoiceInputStop : handleVoiceInputStart}
                  className={`p-3 rounded-full ${isListening ? "bg-red-500 text-white animate-pulse" : theme.button}`}
                  aria-label={isListening ? "Stop voice input" : "Start voice input"}
                  title={`Voice input (Ctrl+Space) ${isListening ? "- Recording..." : ""}`}
                >
                  <Mic size={20} />
                </button>
                
                {/* <button
                  onClick={toggleSpeech}
                  className={`p-3 rounded-full ${isPlaying ? "bg-yellow-500 text-white animate-pulse" : theme.button}`}
                  aria-label={isPlaying ? "Pause read aloud" : "Read aloud"}
                  title={isPlaying ? "Pause read aloud" : "Read aloud"}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button> */}
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={`p-3 rounded-full ${input.trim() ? "custom-gradient-primary hover:shadow-lg" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
                  aria-label="Send message"
                  title="Send message (Enter)"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className={`${showRightSidebar ? "w-80" : "w-0 opacity-0"} transition-all duration-300 ${theme.sidebar} h-full overflow-y-auto`}>
            <div className="p-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${theme.heading}`}>
                  {rightSidebarContent === "history" && (language === "English" ? "Chat History" : "చాట్ చరిత్ర")}
                  {rightSidebarContent === "meetTravis" && (language === "English" ? "Meet TRAVIS" : "TRAVIS ని కలవండి")}
                  {rightSidebarContent === "categories" && (language === "English" ? "Categories" : "వర్గాలు")}
                  {rightSidebarContent === "accessibility" && (language === "English" ? "Accessibility" : "ప్రాప్యత")}
                  {rightSidebarContent === "howToUse" && (language === "English" ? "How to Use" : "ఎలా ఉపయోగించాలి")}
                </h2>
                <button
                  onClick={() => setShowRightSidebar(false)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  aria-label="Close sidebar"
                >
                  <X size={20} />
                </button>
              </div>
              {renderRightSidebarContent()}
            </div>
          </div>

          {/* Toggle right sidebar button (mobile) */}
          {showRightSidebar && (
            <button
              onClick={() => setShowRightSidebar(false)}
              className="fixed right-0 top-1/2 transform -translate-y-1/2 mr-80 transition-all duration-300 custom-gradient-primary text-white p-2 rounded-l-md z-10"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Decorative Gradient Waves */}
        <div className="fixed inset-x-0 bottom-0 z-0 overflow-hidden pointer-events-none">
          <svg viewBox="0 0 1440 320" className="w-full h-auto">
            <path
              fill="#5925DC"
              fillOpacity="0.3"
              d="M0,160L60,144C120,128,240,96,360,117.3C480,139,600,213,720,240C840,267,960,245,1080,240C1200,235,1320,245,1380,250.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
            <path
              fill="#FFC95C"
              fillOpacity="0.2"
              d="M0,288L60,266.7C120,245,240,203,360,181.3C480,160,600,160,720,160C840,160,960,160,1080,186.7C1200,213,1320,267,1380,293.3L1440,320L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Translation Panel - Commented out due to undefined variables */}
        {showTranslation && (
          <div className="translation-overlay">
            <div className={`translation-container ${theme.sidebar} ${fontSizeClass}`}>
              <div className="translation-header">
                <h2 className={`translation-heading ${theme.heading}`}>
                  {language === "English" ? "Translation" : "అనువాదం"}
                </h2>
                <button onClick={() => setShowTranslation(false)} className="translation-close-button">
                  <X size={20} />
                </button>
              </div>
              <p className={theme.text}>Translation panel placeholder (requires missing state and logic)</p>
            </div>
          </div>
        )}

        {/* Voice Input Indicator */}
        {isListening && (
          <div className="voice-indicator">
            <Mic size={18} />
            {language === "English" ? "Listening..." : "వింటోంది..."}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatPage;