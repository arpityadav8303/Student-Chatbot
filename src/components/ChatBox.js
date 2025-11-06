import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import './styles/style.css';

//  ADD YOUR API KEY HERE 


//  ALLOWED TOPICS FOR STUDY & CAREER
const ALLOWED_TOPICS = {
  subjects: ['math', 'mathematics', 'science', 'physics', 'chemistry', 'biology', 'english', 'hindi', 'history', 'geography', 'social', 'economics', 'commerce', 'computer', 'programming', 'coding', 'python', 'javascript', 'web development'],
  studyRelated: ['exam', 'test', 'homework', 'assignment', 'project', 'study', 'learning', 'lecture', 'class', 'course', 'tutorial', 'lesson', 'topic', 'concept', 'chapter', 'notes', 'revision', 'practice'],
  careerRelated: ['career', 'job', 'university', 'college', 'school', 'course', 'engineering', 'medical', 'counseling', 'guidance', 'stream', 'subject', 'board', 'exam preparation', 'entrance', 'neet', 'jee', 'upsc', 'scholarship', 'admission', 'internship', 'skills', 'qualification', 'degree']
};

//  BLOCKED KEYWORDS - Topics NOT allowed
const BLOCKED_KEYWORDS = ['movie', 'game', 'song', 'joke', 'weather', 'sports', 'recipe', 'cooking', 'politics', 'religion', 'dating', 'relationship', 'celebrity', 'gossip', 'crypto', 'bitcoin', 'stock', 'lottery', 'gambling'];

export default function ChatBox({ studentName, studentClass, onBack }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: `Hello ${studentName}! 👋 Welcome to your personal study assistant. I'm here to help you with Class ${studentClass} academic questions, study tips, and career guidance. Feel free to ask me anything related to your studies and career!`,
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  }, [studentName, studentClass]);

  // Auto scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ✅ CHECK IF QUESTION IS ABOUT STUDY/CAREER
  const isStudyOrCareerRelated = (question) => {
    const lowerQuestion = question.toLowerCase().trim();

    // Check if it contains blocked keywords
    for (let keyword of BLOCKED_KEYWORDS) {
      if (lowerQuestion.includes(keyword)) {
        return false;
      }
    }

    // Check if it contains allowed keywords
    const allKeywords = [
      ...ALLOWED_TOPICS.subjects,
      ...ALLOWED_TOPICS.studyRelated,
      ...ALLOWED_TOPICS.careerRelated
    ];

    for (let keyword of allKeywords) {
      if (lowerQuestion.includes(keyword)) {
        return true;
      }
    }

    // Additional checks for common study questions
    if (
      lowerQuestion.includes('how to') ||
      lowerQuestion.includes('what is') ||
      lowerQuestion.includes('explain') ||
      lowerQuestion.includes('define') ||
      lowerQuestion.includes('solve') ||
      lowerQuestion.includes('calculate') ||
      lowerQuestion.includes('difference between') ||
      lowerQuestion.includes('example of') ||
      lowerQuestion.includes('what are') ||
      lowerQuestion.includes('when is') ||
      lowerQuestion.includes('where is') ||
      lowerQuestion.includes('why is') ||
      lowerQuestion.includes('can you help') ||
      lowerQuestion.includes('how do')
    ) {
      return true;
    }

    return false;
  };

  // Call Gemini API with correct format
  const callGeminiAPI = async (question) => {
    try {
      // ✅ CHECK IF QUESTION IS ALLOWED
      if (!isStudyOrCareerRelated(question)) {
        return "📚 I'm specifically designed to help with **study and career-related questions only**. \n\nPlease ask me about:\n• Academic subjects (Math, Science, English, etc.)\n• Study tips and exam preparation\n• Career guidance and course selection\n• Homework help and project ideas\n• College/University information\n\nWhat study or career topic would you like help with?";
      }

      // Check if API key is valid
      if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
        return "❌ Please add your Gemini API key to the ChatBox.jsx file first.";
      }

      console.log('Sending request to Gemini API...');
      console.log('Question:', question);

      // Make API call with correct format
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful and friendly educational tutor for Class ${studentClass} students in India. You ONLY answer questions related to academics, studies, and career guidance.

IMPORTANT RULES:
1. Only answer study, academic, and career-related questions
2. If someone asks about non-educational topics, politely decline
3. Answer clearly and educationally, using simple language
4. Provide examples when possible
5. Be encouraging and supportive

Question from student: ${question}

Please provide a clear, educational answer focused on helping the student with their studies or career.`
                  }
                ]
              }
            ],
            generationConfig: {
              maxOutputTokens: 1024,
              temperature: 0.7,
              topP: 0.8,
              topK: 40
            }
          })
        }
      );

      console.log('Response Status:', response.status);

      // Handle response errors
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);

        if (response.status === 400) {
          return "❌ Bad Request: The request format is incorrect. Please try again.";
        } else if (response.status === 401 || response.status === 403) {
          return "❌ Authentication Error: Please check if your API key is valid and enabled.";
        } else if (response.status === 429) {
          return "⏱️ Rate Limited: Too many requests. Please wait a moment and try again.";
        } else if (response.status === 500) {
          return "❌ Server Error: Google's servers are having issues. Please try again later.";
        } else {
          return `❌ Error (${response.status}): ${errorData.error?.message || 'Unable to get response'}`;
        }
      }

      // Parse the response
      const data = await response.json();
      console.log('Full API Response:', data);

      // Check if we have candidates
      if (!data.candidates || data.candidates.length === 0) {
        return " No response from API. The model might have filtered the response. Please try a different question.";
      }

      // Extract text from the response
      const candidate = data.candidates[0];

      if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
        return " Invalid response format from API. Please try again.";
      }

      const responseText = candidate.content.parts[0].text;

      if (!responseText) {
        return " Received empty response from API. Please try again.";
      }

      console.log('Success! Response:', responseText);
      return responseText;

    } catch (error) {
      console.error('Error caught:', error);
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);

      if (error instanceof TypeError) {
        if (error.message.includes('Failed to fetch')) {
          return " Network Error: Please check your internet connection.";
        }
        return " Network Error: Unable to reach the API. Please try again.";
      }

      if (error.message.includes('API key')) {
        return " API Key Error: Please verify your API key is correct and valid.";
      }

      if (error.message.includes('quota')) {
        return "Quota Error: You've reached your API quota limit. Please try again later.";
      }

      if (error.message.includes('permission')) {
        return " Permission Error: Make sure the Gemini API is enabled in your Google Cloud project.";
      }

      return "Error: " + (error.message || "Unable to process your question. Please try again.");
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      // Get response from Gemini API
      const response = await callGeminiAPI(inputMessage);

      // Add bot message
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Unhandled Error in handleSendMessage:', error);

      const errorMessage = {
        id: Date.now() + 1,
        text: "❌ An unexpected error occurred. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-content">
            <MessageCircle size={24} className="chat-icon" />
            <div>
              <h3 className="chat-title">StudyBot Assistant</h3>
              <small className="chat-subtitle">Class {studentClass}</small>
            </div>
          </div>
          <button
            onClick={onBack}
            className="close-btn"
            title="Close chat"
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="messages-area">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-content">
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="message bot-message">
              <div className="message-content loading-message">
                <span className="typing-dots">● ● ●</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !loading && inputMessage.trim()) {
                handleSendMessage();
              }
            }}
            placeholder="Ask me about studies, exams, or career..."
            disabled={loading}
            className="chat-input"
            autoFocus
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !inputMessage.trim()}
            className="send-btn"
            title="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}