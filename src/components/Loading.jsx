import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

const Loading = ({ isLoaded, setIsLoaded }) => {
  const { progress, total, loaded, item } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  useEffect(() => {
    console.log(progress, total, loaded, item);
    if (progress === 100) {
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    }
  }, [progress, total, loaded, item, setIsLoaded]);

  return (
    <div
      className={`fixed inset-0 w-full h-full z-50 pointer-events-none transition-opacity duration-1000 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700
        ${isLoaded ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex flex-col items-center space-y-8 px-4">
        <div className="text-2xl md:text-6xl lg:text-8xl font-bold text-gray-200 relative text-center">
          <h1
            className="absolute inset-0 overflow-hidden text-clip transition-all duration-300 ease-out bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            style={{
              width: `${displayProgress}%`,
              whiteSpace: "nowrap",
            }}
          >
            Welcome to Saa Portfolio
          </h1>
          <h1 className="opacity-30 whitespace-nowrap">
            Welcome to Saa Portfolio
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-96 h-2 bg-slate-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="text-sm md:text-lg text-gray-400 font-medium">
          {Math.round(displayProgress)}%
        </div>

        {/* Loading Items Info */}
        {item && (
          <div className="text-xs md:text-sm text-gray-500 text-center max-w-md truncate">
            Loading: {item}
          </div>
        )}

        {/* Loading Animation Dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
