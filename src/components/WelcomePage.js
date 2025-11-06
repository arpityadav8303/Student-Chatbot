import React from 'react';
import './styles/style.css';

export default function WelcomePage({
  studentName,
  studentClass,
  onBack,
  onStartChat
}) {
  return (
    <div className="container-main">
      <div className="card-wrapper welcome-card">
        <div className="welcome-header">
          <span className="welcome-emoji">👋</span>
          <h2 className="welcome-title">
            Welcome, <span className="highlight">{studentName}</span>!
          </h2>
          <p className="welcome-class">📚 Class {studentClass}</p>
          <p className="welcome-message">
            I'm excited to help you learn and solve your doubts today!
          </p>
        </div>

        <div className="button-group">
          <button
            onClick={onStartChat}
            className="btn btn-primary btn-large"
          >
            ✨ Start Asking Questions
          </button>
          <button
            onClick={onBack}
            className="btn btn-secondary btn-large"
          >
            ← Back
          </button>
        </div>

        <div className="tip-box">
          <small>
            💡 <strong>Tip:</strong> You can ask about Math, Science, History, English, and more!
          </small>
        </div>
      </div>
    </div>
  );
}