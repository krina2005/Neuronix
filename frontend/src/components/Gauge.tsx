import React from "react";
import { motion } from "framer-motion";

interface GaugeProps {
  value: number;
  max: number;
  label?: string;
  color?: string;
  size?: string;
}

const Gauge: React.FC<GaugeProps> = ({
  value,
  max,
  label,
  color = "blue",
  size = "large",
}) => {
  const percentage = (value / max) * 100;

  const sizeClasses: Record<string, string> = {
    small: "w-32 h-32",
    medium: "w-40 h-40",
    large: "w-48 h-48",
  };

  const colorMap: Record<
    string,
    { stroke: string; glow: string }
  > = {
    blue: { stroke: "#00d4ff", glow: "rgba(0, 212, 255, 0.5)" },
    purple: { stroke: "#9333ea", glow: "rgba(147, 51, 234, 0.5)" },
    green: { stroke: "#10b981", glow: "rgba(16, 185, 129, 0.5)" },
    yellow: { stroke: "#fbbf24", glow: "rgba(251, 191, 36, 0.5)" },
    red: { stroke: "#ef4444", glow: "rgba(239, 68, 68, 0.5)" },
    orange: { stroke: "#f97316", glow: "rgba(249, 115, 22, 0.5)" },
  };

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${sizeClasses[size]}`}>
        <svg className="transform -rotate-90 w-full h-full">
          <defs>
            <filter id={`glow-${label}`}>
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle
            cx="50%"
            cy="50%"
            r="70"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="12"
            fill="none"
          />

          <motion.circle
            cx="50%"
            cy="50%"
            r="70"
            stroke={colorMap[color].stroke}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            filter={`url(#glow-${label})`}
            style={{
              filter: `drop-shadow(0 0 10px ${colorMap[color].glow})`,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(percentage)}%
          </motion.span>
        </div>
      </div>

      {label && (
        <motion.p
          className="mt-4 text-sm font-medium text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {label}
        </motion.p>
      )}
    </div>
  );
};

export default Gauge;
