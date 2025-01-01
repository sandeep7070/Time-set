import React, { useState } from 'react';
import { X } from 'lucide-react';

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
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden pt-44">
      <div className="flex justify-between bg-blue-500 px-6 py-4 items-center">
        <h2 className="text-lg text-white font-medium">Edit Timer</h2>
        <button 
          onClick={onClose} 
          className="text-gray-600 hover:bg-red-500 p-2 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-2 space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="number"
              value={time.hours}
              onChange={(e) => handleTimeChange('hours', e.target.value)}
              className="w-full px-3 py-2 text-lg border rounded text-center focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              min="0"
              max="23"
            />
            <label className="block text-sm text-gray-600 text-center mt-2">Hrs</label>
          </div>
          <div className="flex items-center text-xl font-medium text-gray-600">:</div>
          <div className="flex-1">
            <input
              type="number"
              value={time.minutes}
              onChange={(e) => handleTimeChange('minutes', e.target.value)}
              className="w-full px-3 py-2 text-lg border rounded text-center focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              min="0"
              max="59"
            />
            <label className="block text-sm text-gray-600 text-center mt-2">Mins</label>
          </div>
          <div className="flex items-center text-xl font-medium text-gray-600">:</div>
          <div className="flex-1">
            <input
              type="number"
              value={time.seconds}
              onChange={(e) => handleTimeChange('seconds', e.target.value)}
              className="w-full px-3 py-2 text-lg border rounded text-center focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              min="0"
              max="59"
            />
            <label className="block text-sm text-gray-600 text-center mt-2">Secs</label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timer Name
          </label>
          <input
            type="text"
            value={timerName}
            onChange={(e) => setTimerName(e.target.value)}
            className="w-full px-3 py-2 text-base border rounded focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter timer name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timer End Alarm
          </label>
          <select className="w-full px-3 py-2 text-base border rounded focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200">
            <option value="">--None--</option>
            <option value="beep">Beep</option>
            <option value="alarm">Alarm</option>
          </select>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            onClick={handleDone}
            className="bg-green-500 text-white px-6 py-2 rounded-lg text-base font-medium hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;