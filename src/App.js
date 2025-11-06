
import React, { useState } from 'react';
import HomePage from './components/HomePage';
import WelcomePage from './components/WelcomePage';
import ChatBox from './components/ChatBox';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');

  const handleContinue = (name, classValue) => {
    setStudentName(name);
    setStudentClass(classValue);
    setCurrentPage('welcome');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setStudentName('');
    setStudentClass('');
  };

  const handleStartChat = () => {
    setCurrentPage('chat');
  };

  return (
    <div>
      {currentPage === 'home' && (
        <HomePage onContinue={handleContinue} />
      )}
      {currentPage === 'welcome' && (
        <WelcomePage
          studentName={studentName}
          studentClass={studentClass}
          onBack={handleBackToHome}
          onStartChat={handleStartChat}
        />
      )}
      {currentPage === 'chat' && (
        <ChatBox
          studentName={studentName}
          studentClass={studentClass}
          onBack={() => setCurrentPage('welcome')}
        />
      )}
    </div>
  );
}