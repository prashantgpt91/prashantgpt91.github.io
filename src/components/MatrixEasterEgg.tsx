
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface MatrixNumber {
  id: number;
  x: number;
  y: number;
  value: string;
  speed: number;
  opacity: number;
}

const MatrixEasterEgg = () => {
  const [position, setPosition] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [matrixNumbers, setMatrixNumbers] = useState<MatrixNumber[]>([]);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Generate random matrix numbers
  const generateMatrixNumber = (id: number): MatrixNumber => ({
    id,
    x: Math.random() * 100,
    y: -5,
    value: (Math.random() * 9.999).toFixed(3),
    speed: 0.2 + Math.random() * 0.8,
    opacity: 0.3 + Math.random() * 0.7
  });

  // Initialize matrix numbers
  useEffect(() => {
    const initialNumbers = Array.from({ length: 50 }, (_, i) => ({
      ...generateMatrixNumber(i),
      y: Math.random() * 100
    }));
    setMatrixNumbers(initialNumbers);
  }, []);

  // Animate matrix numbers
  useEffect(() => {
    let lastTime = 0;
    let numberId = 100;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime > 16) { // ~60fps
        setMatrixNumbers(prev => {
          const updated = prev.map(num => ({
            ...num,
            y: num.y + num.speed
          })).filter(num => num.y < 110);

          // Add new numbers occasionally
          if (Math.random() < 0.3 && updated.length < 100) {
            updated.push(generateMatrixNumber(numberId++));
          }

          return updated;
        });
        lastTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Runner animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        if (prev >= 85) {
          setIsRunning(false);
          setShowHint(true);
          setTimeout(() => {
            setPosition(0);
            setIsRunning(true);
            setShowHint(false);
          }, 3000);
          return 85;
        }
        return prev + 0.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleMatrixClick = () => {
    navigate('/games');
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-16">
      <div className="text-center mb-4">
        <p className="text-sm text-gray-500 dark:text-slate-500">
          {showHint ? "Click the matrix to enter..." : "Something's happening in the data streams..."}
        </p>
      </div>
      
      <div 
        ref={containerRef}
        className="relative w-full h-20 bg-gradient-to-r from-gray-900 to-black rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
        onClick={handleMatrixClick}
      >
        {/* Floating Matrix Numbers */}
        <div className="absolute inset-0 overflow-hidden">
          {matrixNumbers.map(num => (
            <div
              key={num.id}
              className="absolute text-green-400 font-mono text-xs transition-all duration-75"
              style={{
                left: `${num.x}%`,
                top: `${num.y}%`,
                opacity: num.opacity,
                transform: 'translateX(-50%)'
              }}
            >
              {num.value}
            </div>
          ))}
        </div>
        
        {/* Matrix overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/10 to-transparent opacity-60" />
        
        {/* Running figure */}
        <div
          className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-linear z-10"
          style={{ left: `${position}%` }}
        >
          <div className={`text-3xl ${isRunning ? 'animate-bounce' : ''}`}>
            {isRunning ? '🏃‍♂️' : '🤖'}
          </div>
        </div>
        
        {/* Matrix entrance effect */}
        <div className="absolute right-4 top-0 bottom-0 w-8 bg-gradient-to-l from-green-500/50 to-transparent opacity-60" />
        
        {/* Glowing border effect on hover */}
        <div className="absolute inset-0 border border-green-500/0 hover:border-green-500/50 rounded-lg transition-all duration-300" />
      </div>
      
      <div className="text-center mt-4 font-mono text-green-400 text-xs opacity-70">
        {showHint && ">>> ENTER THE MATRIX <<<"}
      </div>
    </div>
  );
};

export default MatrixEasterEgg;
