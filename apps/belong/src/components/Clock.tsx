import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'; // Changed to import directly from 'react-dom'

// Clock Component: Displays the current time and updates every second.
const Clock: React.FC = () => {
  // useState hook to manage the 'time' state.
  // The initial state is a string representation of the current local time.
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

  // useEffect hook to handle side effects, specifically setting up and tearing down the interval.
  useEffect(() => {
    // Function to update the time state.
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString());
    };

    // Set up an interval to call updateTime every 1000 milliseconds (1 second).
    const intervalId = setInterval(updateTime, 1000);

    // Cleanup function: This runs when the component unmounts or before the effect re-runs.
    // It's crucial to clear the interval to prevent memory leaks.
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array [] ensures this effect runs only once after the initial render (on mount)
          // and the cleanup runs only once when the component unmounts.

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
        <h1 className="text-6xl font-extrabold text-blue-600 dark:text-blue-400 mb-4 font-inter">
          {time}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg font-inter">
          The current local time.
        </p>
      </div>
    </div>
  );
};
