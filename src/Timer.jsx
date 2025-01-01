// Stopwatch.jsx
import React, { useState, useEffect } from 'react';
import MainEdit from './components/MainEdit';
import Notstarted from './components/Notstarted';

const Stopwatch = ({ initialTime = 120000, initialName = 'Timer 1' }) => {
  const [time, setTime] = useState(initialTime);
  const [running, setRunning] = useState(false);
  const [timerName, setTimerName] = useState(initialName);
  // const [timerName, setTimerName] = useState(initialName);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let interval;
    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime <= 1000 ? 0 : prevTime - 1000;
          // Calculate progress based on remaining time
          setProgress((newTime / initialTime) * 100);
          if (newTime === 0) {
            setRunning(false);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, time, initialTime]);

  const handleStart = () => setRunning(true);
  const handleStop = () => setRunning(false);
  const handleReset = () => {
    setTime(initialTime);
    setRunning(false);
  };

  const formatTime = () => {
    const hours = String(Math.floor(time / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <div className="flex rounded-full mr-px ml-2 text-2xl">
        <div className="text-8xl font-normal mb-8">{formatTime()}</div>
        <div className="flex justify-center rounded-full space-x-4">
          {!running ? (
            <button
              className="bg-green-500 rounded-full hover:bg-green-600 text-white font-bold py-2 px-6 ml-6 mr-6"
              onClick={handleStart}
            >
              Start
            </button>
          ) : (
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 ml-6 mr-6 rounded-full"
              onClick={handleStop}
            >
              Push
            </button>
          )}
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 ml-6 mr-6 rounded-full"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
      <MainEdit 
        initialTime={time} 
        timerName={timerName}
        onTimeChange={setTime}
        onNameChange={setTimerName}

      />
      <div className=" mr-32">
          <Notstarted progress={progress} isRunning={running} />
        </div>
      
    </div>
  );
};

export default Stopwatch;