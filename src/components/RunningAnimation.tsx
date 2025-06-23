
import { useEffect, useState } from "react";

const RunningAnimation = () => {
  const [position, setPosition] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        if (prev >= 100) {
          setIsRunning(false);
          setTimeout(() => {
            setPosition(0);
            setIsRunning(true);
          }, 2000);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg overflow-hidden mb-4">
      {/* Matrix background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 gap-1 h-full p-2">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className={`bg-green-500 rounded opacity-${Math.random() > 0.5 ? '100' : '30'} animate-pulse`}
              style={{ animationDelay: `${Math.random() * 2}s` }}
            />
          ))}
        </div>
      </div>
      
      {/* Running figure */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-75 ease-linear"
        style={{ left: `${position}%` }}
      >
        <div className={`text-2xl ${isRunning ? 'animate-bounce' : ''}`}>
          {isRunning ? '🏃‍♂️' : '😵‍💫'}
        </div>
      </div>
      
      {/* Finish line */}
      <div className="absolute right-2 top-0 bottom-0 w-1 bg-red-500 opacity-50" />
    </div>
  );
};

export default RunningAnimation;
