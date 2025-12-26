import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

interface ErrorLogItem {
  type: string;
  message: string;
  details?: string;
}

interface ErrorLogProps {
  logs: ErrorLogItem[];
  onClear: () => void;
}

const ErrorLog: React.FC<ErrorLogProps> = ({ logs, onClear }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-500/10 border-red-500/30 text-red-400";
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/30 text-yellow-400";
      case "info":
        return "bg-blue-500/10 border-blue-500/30 text-blue-400";
      default:
        return "bg-gray-500/10 border-gray-500/30 text-gray-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-2xl p-6 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-semibold">Error Log</h3>
        </div>

        {logs.length > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Clear Errors
          </button>
        )}
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
        <AnimatePresence>
          {logs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 text-gray-500"
            >
              <Info className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No errors detected</p>
              <p className="text-sm mt-1">System running smoothly</p>
            </motion.div>
          ) : (
            logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-start space-x-3 p-3 rounded-lg border ${getColors(
                  log.type
                )}`}
              >
                <div className="mt-0.5">{getIcon(log.type)}</div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{log.message}</p>
                  {log.details && (
                    <p className="text-xs mt-1 opacity-70">
                      {log.details}
                    </p>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ErrorLog;
