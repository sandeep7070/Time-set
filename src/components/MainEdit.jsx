import React, { useState } from 'react';
import EditPopup from './EditPopup';

export default function MainEdit({ 
  initialTime = 120000, 
  timerName = 'Timer',
  onTimeChange,
  onNameChange 
}) {
  const [showPopup, setShowPopup] = useState(false);

  const handleSave = (newTime, newName) => {
    onTimeChange(newTime);
    onNameChange(newName);
    setShowPopup(false);
  };

  const formatTime = (ms) => {
    const hours = String(Math.floor(ms / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <span>{timerName} ({formatTime(initialTime)})</span>
        <button 
          className="ml-3 text-blue-700 hover:text-blue-800 transition-colors"
          onClick={() => setShowPopup(true)}
        >
          +Edit
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <EditPopup 
              initialTime={initialTime}
              initialName={timerName}
              onSave={handleSave}
              onClose={() => setShowPopup(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}