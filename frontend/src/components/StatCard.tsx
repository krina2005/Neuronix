import { motion } from "framer-motion";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  subtitle?: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
  delay = 0,
}) => {
  const colorClasses: Record<string, string> = {
    blue: "from-cyber-blue/20 to-cyber-blue/5 border-cyber-blue/30 text-cyber-blue",
    purple:
      "from-cyber-purple/20 to-cyber-purple/5 border-cyber-purple/30 text-cyber-purple",
    green:
      "from-green-500/20 to-green-500/5 border-green-500/30 text-green-400",
    yellow:
      "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 text-yellow-400",
    red: "from-red-500/20 to-red-500/5 border-red-500/30 text-red-400",
    orange:
      "from-orange-500/20 to-orange-500/5 border-orange-500/30 text-orange-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative p-6 rounded-2xl bg-gradient-to-br ${
        colorClasses[color]
      } border backdrop-blur-xl overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${
              colorClasses[color]
            }`}
          >
            <Icon className="w-6 h-6" />
          </div>
        </div>

        <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
        <div className="text-3xl font-bold mb-1">{value}</div>
        {subtitle && (
          <p className="text-xs text-gray-500">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
