import React, { useState } from 'react';
// import { X } from 'lucide-react';

const EditPopup = ({ 
  initialTime = 120000, 
  initialName = 'Timer 4',
  onSave,
  onClose 
}) => {
  const [time, setTime] = useState({
    hours: Math.floor(initialTime / 3600000),
    minutes: Math.floor((initialTime % 3600000) / 60000),
    seconds: Math.floor((initialTime % 60000) / 1000)
  });
  const [timerName, setTimerName] = useState(initialName);

  const handleTimeChange = (field, value) => {
    let numValue = Math.max(0, parseInt(value) || 0);
    
    switch (field) {
      case 'hours':
        numValue = Math.min(numValue, 23);
        break;
      case 'minutes':
      case 'seconds':
        numValue = Math.min(numValue, 59);
        break;
      default:
        break;
    }

    const newTime = {
      ...time,
      [field]: numValue
    };
    
    setTime(newTime);
  };

  const handleDone = () => {
    const totalMs = (time.hours * 3600000) + 
                   (time.minutes * 60000) + 
                   (time.seconds * 1000);
    onSave(totalMs, timerName);
    onClose();
  };

  return (
    <div className="w-full max-w-md bg-white shadow">
      <div className="flex justify-between bg-blue-500 h-12 items-center">
        <h2 className="text-base text-white font-normal ml-4">Edit Timer</h2>
        <button 
          onClick={onClose} 
          className="text-white hover:bg-blue-600 p-2 rounded-full transition-colors mr-2"
      
        >
        
        </button>
      </div>

      <div className="p-4">
        <div className="flex gap-2 mb-6">
          <div className="flex-1">
            <input
              type="number"
              value={time.hours}
              onChange={(e) => handleTimeChange('hours', e.target.value)}
              className="w-full p-1 text-base border rounded text-center focus:border-gray-300 focus:outline-none"
              min="0"
              max="23"
            />
            <label className="block text-sm text-gray-600 text-center mt-1">Hrs</label>
          </div>
          <div className="flex items-center text-base font-normal text-gray-600">:</div>
          <div className="flex-1">
            <input
              type="number"
              value={time.minutes}
              onChange={(e) => handleTimeChange('minutes', e.target.value)}
              className="w-full p-1 text-base border rounded text-center focus:border-gray-300 focus:outline-none"
              min="0"
              max="59"
            />
            <label className="block text-sm text-gray-600 text-center mt-1">Mins</label>
          </div>
          <div className="flex items-center text-base font-normal text-gray-600">:</div>
          <div className="flex-1">
            <input
              type="number"
              value={time.seconds}
              onChange={(e) => handleTimeChange('seconds', e.target.value)}
              className="w-full p-1 text-base border rounded text-center focus:border-gray-300 focus:outline-none"
              min="0"
              max="59"
            />
            <label className="block text-sm text-gray-600 text-center mt-1">Secs</label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Timer Name:
          </label>
          <input
            type="text"
            value={timerName}
            onChange={(e) => setTimerName(e.target.value)}
            className="w-full p-1 text-base border rounded focus:border-gray-300 focus:outline-none"
            placeholder="Enter timer name"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            Timer End Alarm:
          </label>
          <select className="w-full p-1 text-base border rounded focus:border-gray-300 focus:outline-none">
            <option value="">--None--</option>
            <option value="beep">Beep</option>
            <option value="alarm">Alarm</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={handleDone}
            className="bg-green-500 text-white py-1 px-4 rounded text-base hover:bg-green-600 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;