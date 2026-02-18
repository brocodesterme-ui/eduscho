import { useState, useEffect } from "react";

type MascotMood = "happy" | "excited" | "thinking" | "celebrating" | "waving";

interface EduMascotProps {
  mood?: MascotMood;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
  speechBubble?: string;
}

const EduMascot = ({ 
  mood = "happy", 
  size = "md", 
  className = "",
  onClick,
  speechBubble
}: EduMascotProps) => {
  const [currentMood, setCurrentMood] = useState(mood);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  // Auto-blink every few seconds
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Auto-bounce
  useEffect(() => {
    const bounceInterval = setInterval(() => {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 600);
    }, 4000);
    return () => clearInterval(bounceInterval);
  }, []);

  useEffect(() => {
    setCurrentMood(mood);
  }, [mood]);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-36 h-36",
    xl: "w-48 h-48",
  };

  const eyeStyle = isBlinking ? "scaleY-0" : "scaleY-100";

  const getBodyColor = () => {
    switch (currentMood) {
      case "excited": return "#22C55E"; // green
      case "celebrating": return "#F59E0B"; // amber
      case "thinking": return "#6366F1"; // indigo
      default: return "#0EA5E9"; // sky blue (primary)
    }
  };

  return (
    <div 
      className={`relative inline-flex flex-col items-center ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {/* Speech Bubble */}
      {speechBubble && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <div className="bg-card border-2 border-border rounded-2xl px-4 py-2 text-sm font-bold text-foreground shadow-lg whitespace-nowrap max-w-[200px] text-center">
            {speechBubble}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-r-2 border-b-2 border-border rotate-45 -mt-2" />
        </div>
      )}

      {/* Mascot SVG */}
      <div
        className={`${sizeClasses[size]} transition-transform duration-300 select-none`}
        style={{
          transform: isBouncing ? "translateY(-8px) scale(1.05)" : "translateY(0) scale(1)",
          transition: "transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))",
        }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Body */}
          <ellipse cx="50" cy="62" rx="28" ry="30" fill={getBodyColor()} />
          
          {/* Belly */}
          <ellipse cx="50" cy="68" rx="18" ry="20" fill="#E0F2FE" />
          
          {/* Head */}
          <circle cx="50" cy="38" r="26" fill={getBodyColor()} />
          
          {/* Ear tufts */}
          <ellipse cx="30" cy="16" rx="7" ry="10" fill={getBodyColor()} transform="rotate(-20, 30, 16)" />
          <ellipse cx="70" cy="16" rx="7" ry="10" fill={getBodyColor()} transform="rotate(20, 70, 16)" />
          <ellipse cx="30" cy="14" rx="4" ry="7" fill="#BAE6FD" transform="rotate(-20, 30, 14)" />
          <ellipse cx="70" cy="14" rx="4" ry="7" fill="#BAE6FD" transform="rotate(20, 70, 14)" />

          {/* Wings */}
          {currentMood === "celebrating" || currentMood === "waving" ? (
            <>
              <ellipse cx="20" cy="58" rx="10" ry="16" fill={getBodyColor()} transform="rotate(-30, 20, 58)" />
              <ellipse cx="80" cy="55" rx="10" ry="16" fill={getBodyColor()} transform="rotate(50, 80, 55)" />
            </>
          ) : (
            <>
              <ellipse cx="22" cy="64" rx="10" ry="14" fill={getBodyColor()} transform="rotate(-15, 22, 64)" />
              <ellipse cx="78" cy="64" rx="10" ry="14" fill={getBodyColor()} transform="rotate(15, 78, 64)" />
            </>
          )}

          {/* Eye whites */}
          <circle cx="40" cy="36" r="10" fill="white" />
          <circle cx="60" cy="36" r="10" fill="white" />

          {/* Eyes / Pupils */}
          <g style={{ transform: `scaleY(${isBlinking ? 0 : 1})`, transformOrigin: "50% 36px", transition: "transform 0.1s" }}>
            <circle cx="40" cy="37" r="6" fill="#1E293B" />
            <circle cx="60" cy="37" r="6" fill="#1E293B" />
            {/* Gleam */}
            <circle cx="43" cy="34" r="2" fill="white" />
            <circle cx="63" cy="34" r="2" fill="white" />
          </g>

          {/* Stars in eyes when excited/celebrating */}
          {(currentMood === "excited" || currentMood === "celebrating") && (
            <>
              <text x="34" y="40" fontSize="10" textAnchor="middle" fill="white">★</text>
              <text x="64" y="40" fontSize="10" textAnchor="middle" fill="white">★</text>
            </>
          )}

          {/* Beak */}
          <ellipse cx="50" cy="44" rx="6" ry="4" fill="#F59E0B" />
          {currentMood !== "thinking" && (
            <path d="M44 45 Q50 52 56 45" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round" />
          )}
          {currentMood === "thinking" && (
            <path d="M44 47 Q50 44 56 47" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round" />
          )}

          {/* Feet */}
          <ellipse cx="40" cy="90" rx="9" ry="5" fill={getBodyColor()} />
          <ellipse cx="60" cy="90" rx="9" ry="5" fill={getBodyColor()} />
          <ellipse cx="40" cy="90" rx="6" ry="3" fill="#F59E0B" />
          <ellipse cx="60" cy="90" rx="6" ry="3" fill="#F59E0B" />

          {/* Thinking bubble */}
          {currentMood === "thinking" && (
            <>
              <circle cx="74" cy="22" r="3" fill="white" opacity="0.8" />
              <circle cx="80" cy="16" r="4" fill="white" opacity="0.8" />
              <circle cx="87" cy="10" r="5" fill="white" opacity="0.9" />
            </>
          )}

          {/* Sparkles when celebrating */}
          {currentMood === "celebrating" && (
            <>
              <text x="15" y="30" fontSize="12" fill="#FCD34D">✦</text>
              <text x="80" y="25" fontSize="10" fill="#FCD34D">✦</text>
              <text x="10" y="50" fontSize="8" fill="#A78BFA">✦</text>
              <text x="85" y="45" fontSize="14" fill="#34D399">✦</text>
            </>
          )}
        </svg>
      </div>
    </div>
  );
};

export default EduMascot;
