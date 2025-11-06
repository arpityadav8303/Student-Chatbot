import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import './styles/style.css';

export default function HomePage({ onContinue }) {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');

  const handleSubmit = () => {
    if (studentName.trim() && studentClass) {
      onContinue(studentName, studentClass);
    }
  };

  return (
    <div className="container-main">
      <div className="card-wrapper">
        <div className="card-header">
          <MessageCircle size={60} className="icon" />
          <h1 className="title">StudyBot</h1>
          <p className="subtitle">Your Personal Study Assistant</p>
        </div>

        <div className="form-group">
          <label className="label">Your Name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter your name"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label className="label">Your Class</label>
          <select
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="input-field"
          >
            <option value="">Select your class</option>
            <option value="10">Class 10</option>
            <option value="12">Class 12</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Continue
        </button>

        <div className="info-box">
          <p>
            💡 <strong>Tip:</strong> Make sure you add your Gemini API key in the code
            to enable AI responses.
          </p>
        </div>
      </div>
    </div>
  );
}