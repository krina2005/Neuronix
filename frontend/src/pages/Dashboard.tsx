import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api";
import {
  Coffee,
  Bug,
  Activity,
  TrendingUp,
  RefreshCw,
  Cpu,
  Zap,
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
    coffeeDependency: 40,
    brainRamUsage: 2.5,
  });

  const [errorLogs, setErrorLogs] = useState<ErrorLogItem[]>([
    {
      type: "info",
      message: "SYSTEM: Dashboard initialized",
      details: "Ready to track your cognitive performance",
    },
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  /* -------------------- IMPROVED CALCULATIONS (Real-World Logic) -------------------- */

  const calculateStats = (): void => {
    setLoading(true);

    // FOCUS LEVEL (0-100)
    // Based on: Sleep quality, stress management, coffee boost, and study fatigue
    let focusLevel = 50; // Base focus

    // Sleep impact (optimal: 7-8 hours)
    if (inputs.sleepHours >= 7 && inputs.sleepHours <= 8) {
      focusLevel += 30; // Optimal sleep
    } else if (inputs.sleepHours >= 6 && inputs.sleepHours < 7) {
      focusLevel += 20; // Good sleep
    } else if (inputs.sleepHours >= 5 && inputs.sleepHours < 6) {
      focusLevel += 10; // Acceptable sleep
    } else if (inputs.sleepHours < 5) {
      focusLevel -= 20; // Poor sleep
    } else if (inputs.sleepHours > 9) {
      focusLevel += 10; // Oversleeping reduces focus
    }

    // Stress impact (lower is better)
    focusLevel -= inputs.stressLevel * 3;

    // Coffee boost (diminishing returns after 3 cups)
    if (inputs.coffeeIntake <= 3) {
      focusLevel += inputs.coffeeIntake * 5;
    } else {
      focusLevel += 15 - (inputs.coffeeIntake - 3) * 2; // Jitters reduce focus
    }

    // Study fatigue (too much studying reduces focus)
    if (inputs.studyHours > 8) {
      focusLevel -= (inputs.studyHours - 8) * 3;
    }

    focusLevel = Math.max(0, Math.min(100, focusLevel));

    // LOGIC POWER (0-100)
    // Based on: Study hours, sleep quality, and mental state
    let logicPower = 40; // Base logic

    // Study hours (optimal: 4-8 hours)
    if (inputs.studyHours >= 4 && inputs.studyHours <= 8) {
      logicPower += inputs.studyHours * 6;
    } else if (inputs.studyHours > 8) {
      logicPower += 48 - (inputs.studyHours - 8) * 4; // Diminishing returns
    } else {
      logicPower += inputs.studyHours * 5;
    }

    // Sleep quality bonus
    if (inputs.sleepHours >= 7 && inputs.sleepHours <= 8) {
      logicPower += 20;
    } else if (inputs.sleepHours < 6) {
      logicPower -= 15;
    }

    // Stress penalty
    logicPower -= inputs.stressLevel * 2;

    logicPower = Math.max(0, Math.min(100, logicPower));

    // BUG COUNT
    // More bugs with: High stress, low sleep, too much studying
    let bugCount = 5; // Base bugs

    bugCount += inputs.stressLevel * 3;
    bugCount += Math.max(0, 7 - inputs.sleepHours) * 4;
    
    if (inputs.studyHours > 10) {
      bugCount += (inputs.studyHours - 10) * 3; // Mental fatigue
    }

    if (inputs.coffeeIntake > 5) {
      bugCount += (inputs.coffeeIntake - 5) * 2; // Jitters cause mistakes
    }

    bugCount = Math.round(Math.max(0, bugCount));

    // COFFEE DEPENDENCY (0-100%)
    // Increases with daily coffee intake
    const coffeeDependency = Math.min(100, inputs.coffeeIntake * 12.5);

    // BRAIN RAM USAGE (0-4 GB)
    // Based on: Study hours, stress, multitasking
    let brainRamUsage = 0.5; // Base usage

    brainRamUsage += (inputs.studyHours / 16) * 2; // Study load
    brainRamUsage += (inputs.stressLevel / 10) * 1; // Stress load
    brainRamUsage += (inputs.coffeeIntake / 8) * 0.5; // Coffee jitters

    if (inputs.sleepHours < 6) {
      brainRamUsage += 0.5; // Sleep deprivation increases mental load
    }

    brainRamUsage = Math.min(4, brainRamUsage);

    const newStats: Stats = {
      focusLevel: Math.round(focusLevel),
      logicPower: Math.round(logicPower),
      bugCount,
      coffeeDependency: Math.round(coffeeDependency),
      brainRamUsage: parseFloat(brainRamUsage.toFixed(1)),
    };

    // GENERATE CONTEXTUAL ERROR LOGS
    const newLogs: ErrorLogItem[] = [];

    if (newStats.focusLevel < 40) {
      newLogs.push({
        type: "error",
        message: "CRITICAL: Focus level critically low",
        details: "Immediate rest recommended to restore cognitive function",
      });
    } else if (newStats.focusLevel < 60) {
      newLogs.push({
        type: "warning",
        message: "WARNING: Focus level below optimal",
        details: "Consider taking a short break or adjusting inputs",
      });
    }

    if (newStats.brainRamUsage > 3.5) {
      newLogs.push({
        type: "error",
        message: "ERROR: Brain RAM overload",
        details: "Mental capacity exceeded - reduce workload immediately",
      });
    } else if (newStats.brainRamUsage > 2.8) {
      newLogs.push({
        type: "warning",
        message: "WARNING: High mental load detected",
        details: "Consider taking breaks to prevent burnout",
      });
    }

    if (inputs.coffeeIntake > 4) {
      newLogs.push({
        type: "warning",
        message: `WARNING: High caffeine intake (${inputs.coffeeIntake} cups)`,
        details: "Excessive coffee may cause anxiety and reduced sleep quality",
      });
    } else if (inputs.coffeeIntake > 0) {
      newLogs.push({
        type: "info",
        message: "INFO: Caffeine boost active",
        details: `System performance enhanced by ~${inputs.coffeeIntake * 10}%`,
      });
    }

    if (inputs.sleepHours < 6) {
      newLogs.push({
        type: "error",
        message: "CRITICAL: Sleep deprivation detected",
        details: "Cognitive functions severely impaired - prioritize rest",
      });
    } else if (inputs.sleepHours < 7) {
      newLogs.push({
        type: "warning",
        message: "WARNING: Insufficient sleep",
        details: "Aim for 7-8 hours for optimal performance",
      });
    } else if (inputs.sleepHours > 9) {
      newLogs.push({
        type: "info",
        message: "INFO: Extended sleep duration",
        details: "Oversleeping may reduce alertness",
      });
    }

    if (newStats.bugCount > 35) {
      newLogs.push({
        type: "error",
        message: "CRITICAL: High error rate detected",
        details: `${newStats.bugCount} logical errors - review and debug required`,
      });
    } else if (newStats.bugCount > 20) {
      newLogs.push({
        type: "warning",
        message: "WARNING: Elevated error count",
        details: "Take breaks between study sessions",
      });
    }

    if (inputs.stressLevel > 7) {
      newLogs.push({
        type: "error",
        message: "CRITICAL: Stress levels dangerously high",
        details: "Practice relaxation techniques immediately",
      });
    } else if (inputs.stressLevel > 5) {
      newLogs.push({
        type: "warning",
        message: "WARNING: Moderate stress detected",
        details: "Consider mindfulness or short walks",
      });
    }

    if (inputs.studyHours > 12) {
      newLogs.push({
        type: "error",
        message: "ERROR: Excessive study duration",
        details: "Diminishing returns - productivity declining",
      });
    } else if (inputs.studyHours > 8) {
      newLogs.push({
        type: "warning",
        message: "WARNING: Long study session",
        details: "Take regular breaks every 90 minutes",
      });
    }

    if (newLogs.length === 0) {
      newLogs.push({
        type: "info",
        message: "✅ SYSTEM STATUS: All systems nominal",
        details: "Optimal performance conditions detected",
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
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
                className="p-4 rounded-xl glass-effect border border-white/10 hover:border-cyber-blue/50 transition-all disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-6 h-6 text-cyber-blue ${
                    loading ? "animate-spin" : ""
                  }`}
                />
              </motion.button>
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Input Panel */}
            <div className="lg:col-span-1">
              <InputPanel
                inputs={inputs}
                setInputs={setInputs}
                onCalculate={calculateStats}
              />
            </div>

            {/* Right Column - Stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* Focus Meter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-effect rounded-2xl p-8 border border-white/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center space-x-2 mb-6">
                    <Activity className="w-5 h-5 text-cyber-blue" />
                    <h3 className="text-xl font-semibold">Focus Meter</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center justify-center">
                      <Gauge
                        value={stats.focusLevel}
                        max={100}
                        label="Focus Level"
                        color="blue"
                        size="large"
                      />
                    </div>

                    <div className="flex flex-col justify-center space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                        <div className="flex items-center space-x-3">
                          <Zap className="w-5 h-5 text-green-400" />
                          <span className="text-sm font-medium text-gray-300">
                            Logic Power
                          </span>
                        </div>
                        <span className="text-2xl font-bold text-green-400">
                          {stats.logicPower}%
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-sm text-gray-400 mb-2">
                          System Status
                        </p>
                        <p className="text-lg font-semibold">
                          {stats.focusLevel > 70
                            ? "✅ Optimal Performance"
                            : stats.focusLevel > 50
                            ? "⚠️ Moderate Performance"
                            : "❌ Low Performance"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Bug Count"
                  value={stats.bugCount}
                  icon={Bug}
                  color="yellow"
                  subtitle="Active bugs"
                  delay={0.1}
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
                  delay={0.2}
                />

                <StatCard
                  title="Brain RAM Usage"
                  value={`${stats.brainRamUsage} GB`}
                  icon={Activity}
                  color={stats.brainRamUsage > 3 ? "red" : "blue"}
                  subtitle={`/ 4.0 GB (${Math.round(
                    (stats.brainRamUsage / 4) * 100
                  )}%)`}
                  delay={0.3}
                />
              </div>

              {/* Brain RAM Progress Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-effect rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-5 h-5 text-cyber-purple" />
                    <h3 className="text-lg font-semibold">Brain RAM Usage</h3>
                  </div>
                  <span className="text-2xl font-bold text-cyber-purple">
                    {Math.round((stats.brainRamUsage / 4) * 100)}%
                  </span>
                </div>

                <div className="relative h-4 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.brainRamUsage / 4) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      stats.brainRamUsage > 3.5
                        ? "bg-gradient-to-r from-red-500 to-orange-500"
                        : stats.brainRamUsage > 2.5
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                        : "bg-gradient-to-r from-cyber-blue to-cyber-purple"
                    }`}
                    style={{
                      boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
                    }}
                  />
                </div>

                <p className="text-sm text-gray-400 mt-2">
                  {stats.brainRamUsage > 3.5
                    ? "⚠️ Mental load is high, consider taking a break."
                    : stats.brainRamUsage > 2.5
                    ? "Working at moderate capacity."
                    : "Plenty of mental resources available."}
                </p>
              </motion.div>

              {/* Error Log */}
              <ErrorLog logs={errorLogs} onClear={() => setErrorLogs([])} />
            </div>
          </div>

          {/* Performance Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 glass-effect rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyber-blue/20 to-transparent border border-cyber-blue/30">
                <TrendingUp className="w-6 h-6 text-cyber-blue" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  💡 Performance Tip
                </h3>
                <p className="text-gray-400">
                  {stats.focusLevel < 50 && inputs.sleepHours < 7
                    ? "Your focus is critically low. Prioritize 7-8 hours of sleep tonight to restore cognitive function."
                    : stats.coffeeDependency > 70
                    ? "High coffee dependency detected. Consider gradually reducing intake to 2-3 cups per day for sustainable energy."
                    : stats.bugCount > 35
                    ? "High error count detected. Take a 15-minute break every 90 minutes during study sessions."
                    : inputs.stressLevel > 7
                    ? "Stress levels are very high. Try deep breathing exercises or a short walk to reduce cortisol levels."
                    : inputs.studyHours > 10
                    ? "Extended study session detected. Productivity decreases after 8 hours - consider spreading work across multiple days."
                    : stats.brainRamUsage > 3.5
                    ? "Mental capacity nearly maxed out. Take a 20-minute power nap to reset cognitive resources."
                    : "Excellent! Your brain is operating at optimal levels. Maintain current habits for sustained performance."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;