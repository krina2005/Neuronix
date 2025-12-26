import { motion } from "framer-motion";
import { Moon, Coffee, BookOpen, Zap } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { Inputs } from "../types";

/* -------------------- Types -------------------- */

interface InputPanelProps {
  inputs: Inputs;
  setInputs: Dispatch<SetStateAction<Inputs>>;
  onCalculate: () => void;
}

type InputFieldConfig = {
  label: string;
  field: keyof Inputs;
  min: number;
  max: number;
  step: number;
  icon: React.ComponentType<{ className?: string }>;
  color: "blue" | "purple" | "orange" | "red";
  unit: string;
};

/* -------------------- Component -------------------- */

const InputPanel: React.FC<InputPanelProps> = ({
  inputs,
  setInputs,
  onCalculate,
}) => {
  const handleChange = (field: keyof Inputs, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  const inputFields: InputFieldConfig[] = [
    {
      label: "Sleep Hours",
      field: "sleepHours",
      min: 0,
      max: 12,
      step: 0.5,
      icon: Moon,
      color: "blue",
      unit: "hrs",
    },
    {
      label: "Study Hours",
      field: "studyHours",
      min: 0,
      max: 24,
      step: 0.5,
      icon: BookOpen,
      color: "purple",
      unit: "hrs",
    },
    {
      label: "Coffee Intake",
      field: "coffeeIntake",
      min: 0,
      max: 10,
      step: 1,
      icon: Coffee,
      color: "orange",
      unit: "cups",
    },
    {
      label: "Stress Level",
      field: "stressLevel",
      min: 0,
      max: 10,
      step: 1,
      icon: Zap,
      color: "red",
      unit: "/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-2xl p-6 border border-white/10"
    >
      <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
        <Zap className="w-5 h-5 text-cyber-blue" />
        <span>Input Parameters</span>
      </h3>

      <div className="space-y-6">
        {inputFields.map((field, index) => {
          const Icon = field.icon;

          return (
            <motion.div
              key={field.field}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-gray-400" />
                  <label className="text-sm font-medium text-gray-300">
                    {field.label}
                  </label>
                </div>

                <span className="text-sm font-bold text-cyber-blue">
                  {inputs[field.field]} {field.unit}
                </span>
              </div>

              <input
                type="range"
                min={field.min}
                max={field.max}
                step={field.step}
                value={inputs[field.field]}
                onChange={(e) =>
                  handleChange(field.field, e.target.value)
                }
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--tw-gradient-from) ${
                    (inputs[field.field] / field.max) * 100
                  }%, rgba(255,255,255,0.1) ${
                    (inputs[field.field] / field.max) * 100
                  }%)`,
                  "--tw-gradient-from":
                    field.color === "blue"
                      ? "#00d4ff"
                      : field.color === "purple"
                      ? "#9333ea"
                      : field.color === "orange"
                      ? "#f97316"
                      : "#ef4444",
                } as React.CSSProperties}
              />
            </motion.div>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onCalculate}
        className="w-full mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-purple hover:shadow-lg hover:shadow-cyber-blue/50 transition-all font-semibold"
      >
        Calculate Brain Stats
      </motion.button>
    </motion.div>
  );
};

export default InputPanel;
