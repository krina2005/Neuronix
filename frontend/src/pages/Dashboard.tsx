import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import axios from "axios";
import api from "../api";
import {
  // Brain,
  // Cpu,
  Coffee,
  Bug,
  Activity,
  // Zap,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import Gauge from "../components/Gauge";
import ErrorLog from "../components/ErrorLog";
import InputPanel from "../components/InputPanel";

/* -------------------- Types -------------------- */

interface Inputs {
  sleepHours: number;
  studyHours: number;
  coffeeIntake: number;
  stressLevel: number;
}

interface Stats {
  focusLevel: number;
  logicPower: number;
  bugCount: number;
  coffeeDependency: number;
  brainRamUsage: number;
}

interface ErrorLogItem {
  type: string;
  message: string;
  details?: string;
}

/* -------------------- Component -------------------- */

const Dashboard: React.FC = () => {
  const [inputs, setInputs] = useState<Inputs>({
    sleepHours: 7,
    studyHours: 4,
    coffeeIntake: 2,
    stressLevel: 5,
  });

  const [stats, setStats] = useState<Stats>({
    focusLevel: 67,
    logicPower: 78,
    bugCount: 34,
    coffeeDependency: 88,
    brainRamUsage: 3.5,
  });

  const [errorLogs, setErrorLogs] = useState<ErrorLogItem[]>([
    {
      type: "error",
      message: "ERROR 404: Focus not found",
      details: "Unable to locate concentration module",
    },
    {
      type: "warning",
      message: "WARNING: Brain overheating",
      details: "Reduce input load to prevent thermal shutdown",
    },
    {
      type: "info",
      message: "INFO: Coffee detected",
      details: "System performance boosted by 25%",
    },
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  /* -------------------- Calculations -------------------- */

  const calculateStats = (): void => {
    setLoading(true);

    const focusLevel = Math.max(
      0,
      Math.min(
        100,
        (inputs.sleepHours / 8) * 50 +
          ((10 - inputs.stressLevel) / 10) * 30 +
          (inputs.coffeeIntake / 5) * 20
      )
    );

    const logicPower = Math.max(
      0,
      Math.min(
        100,
        (inputs.studyHours / 8) * 50 +
          (inputs.sleepHours / 8) * 40 +
          ((10 - inputs.stressLevel) / 10) * 10
      )
    );

    const bugCount = Math.round(
      inputs.stressLevel * 5 +
        Math.max(0, 8 - inputs.sleepHours) * 3
    );

    const coffeeDependency = Math.min(100, inputs.coffeeIntake * 15);

    const brainRamUsage = Math.min(
      4,
      (inputs.studyHours / 8) * 2 +
        (inputs.stressLevel / 10) * 1.5 +
        (inputs.coffeeIntake / 5) * 0.5
    );

    const newStats: Stats = {
      focusLevel: Math.round(focusLevel),
      logicPower: Math.round(logicPower),
      bugCount,
      coffeeDependency: Math.round(coffeeDependency),
      brainRamUsage: parseFloat(brainRamUsage.toFixed(1)),
    };

    const newLogs: ErrorLogItem[] = [];

    if (newStats.focusLevel < 50) {
      newLogs.push({
        type: "error",
        message: "ERROR 404: Focus not found",
        details: "Unable to locate concentration module",
      });
    }

    if (newStats.brainRamUsage > 3.5) {
      newLogs.push({
        type: "warning",
        message: "WARNING: Brain overheating",
        details: "Reduce input load to prevent thermal shutdown",
      });
    }

    if (inputs.coffeeIntake > 3) {
      newLogs.push({
        type: "info",
        message: "INFO: Coffee detected",
        details: `System performance boosted by ${inputs.coffeeIntake * 8}%`,
      });
    }

    if (inputs.sleepHours < 6) {
      newLogs.push({
        type: "warning",
        message: "WARNING: Low sleep detected",
        details: "Insufficient rest may cause system instability",
      });
    }

    if (newStats.bugCount > 40) {
      newLogs.push({
        type: "error",
        message: "CRITICAL: Bug overflow",
        details: "Too many logical errors detected",
      });
    }

    if (inputs.stressLevel > 7) {
      newLogs.push({
        type: "warning",
        message: "WARNING: High stress levels",
        details: "System performance may be degraded",
      });
    }

    setTimeout(() => {
      setStats(newStats);
      setErrorLogs(newLogs);
      setLoading(false);
      saveStats(newStats);
    }, 1000);
  };

  /* -------------------- API -------------------- */

const saveStats = async (statsData: Stats): Promise<void> => {
  try {
    await api.post("/stats", statsData);
  } catch (error) {
    console.error("Error saving stats:", error);
  }
};

const loadStats = async (): Promise<void> => {
  try {
    const response = await api.get("/stats");
    if (response.data) {
      setStats(response.data);
    }
  } catch (error) {
    console.log("No stats found yet");
  }
};


  useEffect(() => {
    loadStats();
  }, []);

  const userName = localStorage.getItem("userName") || "User";

  /* -------------------- JSX -------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-darker">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2">
                NeuroNix
              </h1>
              <p className="text-gray-400">
                Hi{" "}
                <span className="text-cyber-blue font-semibold">
                  {userName}
                </span>
                , your dashboard is up to date.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={calculateStats}
              disabled={loading}
              className="p-4 rounded-xl glass-effect border border-white/10"
            >
              <RefreshCw
                className={`w-6 h-6 text-cyber-blue ${
                  loading ? "animate-spin" : ""
                }`}
              />
            </motion.button>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <InputPanel
              inputs={inputs}
              setInputs={setInputs}
              onCalculate={calculateStats}
            />

            <div className="lg:col-span-2 space-y-6">
              {/* Focus */}
              <Gauge
                value={stats.focusLevel}
                max={100}
                label="Focus Level"
                color="blue"
                size="large"
              />

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Bug Count"
                  value={stats.bugCount}
                  icon={Bug}
                  color="yellow"
                  subtitle="Active bugs"
                />

                <StatCard
                  title="Coffee Dependency"
                  value={`${stats.coffeeDependency}%`}
                  icon={Coffee}
                  color="orange"
                  subtitle={
                    stats.coffeeDependency > 70
                      ? "HIGH"
                      : stats.coffeeDependency > 40
                      ? "MEDIUM"
                      : "LOW"
                  }
                />

                <StatCard
                  title="Brain RAM Usage"
                  value={`${stats.brainRamUsage} GB`}
                  icon={Activity}
                  color={stats.brainRamUsage > 3 ? "red" : "blue"}
                  subtitle={`/ 4.0 GB`}
                />
              </div>

              <ErrorLog
                logs={errorLogs}
                onClear={() => setErrorLogs([])}
              />
            </div>
          </div>

          {/* Tip */}
          <div className="mt-6 glass-effect rounded-2xl p-6 border border-white/10">
            <TrendingUp className="w-6 h-6 text-cyber-blue mb-2" />
            <p className="text-gray-400">
              {stats.focusLevel < 50 && inputs.sleepHours < 7
                ? "Your focus is low. Try getting more sleep."
                : stats.coffeeDependency > 70
                ? "High coffee dependency detected."
                : stats.bugCount > 40
                ? "Bug count is high. Take breaks."
                : inputs.stressLevel > 7
                ? "Stress levels are high."
                : "Great job! Your brain is performing optimally."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
