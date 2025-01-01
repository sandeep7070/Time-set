import React, { useState } from 'react';
import Stopwatch from '../Timer';

function TimerApp() {
  const [timers, setTimers] = useState([
    { id: 1, initialTime: 120000, name: 'Timer 1' }
  ]);

  const addTimer = () => {
    const newId = timers.length + 1;
    setTimers([...timers, { 
      id: newId, 
      initialTime: 120000, 
      name: `Timer ${newId}` 
    }]);
  };

  // Determine scale based on number of timers
  const getTimerScale = () => {
    if (timers.length === 1) {
      return 'scale-100'; // Medium size for single timer
    }
    return 'scale-75'; // Smaller size for multiple timers
  };

  return (
    <div className="space-y-8 p-4 w-%]">
      <div className={` gap-6 ${timers.length > 1 ? ' lg:grid-cols-3' : ''}`}>
        {timers.map((timer) => (
          <div 
            key={timer.id} 
            className={` rounded-lg p-6 w-screen  shadow-sm transition-all duration-300 ${getTimerScale()} origin-left`}
          >
            <Stopwatch 
              initialTime={timer.initialTime}
              initialName={timer.name}
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <button
          onClick={addTimer}
          className=" hover:blue-500  text-blue-600 font-semibold  rounded-sm transition-colors duration-200 mr-[81%]"
        >
          + Add another timer
        </button>
      </div>
    </div>
  );
}

export default TimerApp;