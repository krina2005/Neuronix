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
    stressLevel: 3,
  });

  const [stats, setStats] = useState<Stats>({
    focusLevel: 95,
    logicPower: 85,
    bugCount: 8,
    coffeeDependency: 25,
    brainRamUsage: 1.8,
  });

  const [errorLogs, setErrorLogs] = useState<ErrorLogItem[]>([
    {
      type: "info",
      message: "SYSTEM: Dashboard initialized",
      details: "Ready to track your cognitive performance",
    },
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  /* -------------------- HELPER FUNCTIONS FOR LABELS -------------------- */

  const getSleepLabel = (hours: number): string => {
    if (hours >= 7 && hours <= 8) return "⭐ Optimal";
    if (hours >= 6 && hours < 7) return "🟡 Okay";
    if (hours < 6) return "🔴 Critical";
    if (hours > 9) return "🟠 Oversleep";
    return "🟢 Good";
  };

  const getStudyLabel = (hours: number): string => {
    if (hours === 0) return "💤 Idle";
    if (hours >= 2 && hours < 4) return "🟢 Learning Mode";
    if (hours >= 4 && hours <= 6) return "⭐ Optimal Learning";
    if (hours > 6 && hours <= 8) return "🟡 Heavy Load";
    if (hours > 8) return "🔴 Burnout Risk";
    return "🟢 Light";
  };

  const getStressLabel = (level: number): string => {
    if (level >= 0 && level <= 1) return "😴 Too Relaxed";
    if (level >= 2 && level <= 4) return "⭐ Optimal Pressure";
    if (level >= 5 && level <= 6) return "🟡 Moderate Stress";
    if (level >= 7) return "🔴 High Stress";
    return "🟢 Good";
  };

  /* -------------------- CALCULATIONS WITH YOUR EXACT LOGIC -------------------- */

  const calculateStats = (): void => {
    setLoading(true);

    // ========================================
    // FOCUS LEVEL (0-100)
    // MOST IMPORTANT: SLEEP
    // ========================================
    
    let focusLevel = 60; // Base starting point

    // 🛌 SLEEP (MOST IMPORTANT FACTOR)
    if (inputs.sleepHours >= 7 && inputs.sleepHours <= 8) {
      focusLevel += 45; // ⭐ BEST FOCUS - Optimal sleep
    } else if (inputs.sleepHours >= 6 && inputs.sleepHours < 7) {
      focusLevel += 30; // 🟡 Okay - Acceptable but not peak
    } else if (inputs.sleepHours < 6) {
      focusLevel += 10 - (6 - inputs.sleepHours) * 8; // 🔴 Critical - Brain fog
    } else if (inputs.sleepHours > 9) {
      focusLevel += 20; // 🟠 Oversleep - Low alertness, laziness
    } else {
      focusLevel += 35; // Between 8-9 hours
    }

    // 😌 STRESS (Healthy stress 2-4, Zero = laziness, High = panic)
    if (inputs.stressLevel >= 2 && inputs.stressLevel <= 4) {
      focusLevel += 10; // ⭐ Best focus - Optimal pressure, motivated
    } else if (inputs.stressLevel === 0 || inputs.stressLevel === 1) {
      focusLevel -= 15; // 😴 Too relaxed - Laziness, no motivation
    } else if (inputs.stressLevel >= 5 && inputs.stressLevel <= 6) {
      focusLevel -= 10; // 🟡 Acceptable - Exam pressure
    } else if (inputs.stressLevel >= 7) {
      focusLevel -= (inputs.stressLevel - 6) * 12; // 🔴 Bad - Panic, mistakes, bad memory
    }

    // ☕ COFFEE/TEA (Helps focus only when sleep is good)
    if (inputs.sleepHours >= 6) {
      // Coffee helps only with good sleep
      if (inputs.coffeeIntake >= 1 && inputs.coffeeIntake <= 2) {
        focusLevel += 10; // ✅ Ideal - Boosts focus
      } else if (inputs.coffeeIntake === 3) {
        focusLevel += 5; // 🟡 Acceptable
      } else if (inputs.coffeeIntake > 3) {
        focusLevel -= (inputs.coffeeIntake - 3) * 5; // 🔴 Too much - Anxiety, jittery
      }
    } else {
      // Poor sleep - coffee doesn't help much
      if (inputs.coffeeIntake > 3) {
        focusLevel -= (inputs.coffeeIntake - 3) * 3; // Makes it worse
      }
    }

    // 📚 STUDY HOURS (Brain works in chunks, not marathons)
    if (inputs.studyHours >= 4 && inputs.studyHours <= 6) {
      focusLevel += 5; // ⭐ Optimal learning
    } else if (inputs.studyHours >= 2 && inputs.studyHours < 4) {
      focusLevel += 0; // 🟢 Light learning - No impact
    } else if (inputs.studyHours > 6 && inputs.studyHours <= 8) {
      focusLevel -= 5; // 🟡 Heavy load - Needs breaks
    } else if (inputs.studyHours > 8 && inputs.studyHours <= 10) {
      focusLevel -= 15; // 🔴 Burnout risk - Focus drops
    } else if (inputs.studyHours > 10) {
      focusLevel -= 25; // 🔴 Dangerous - Focus drops sharply
    }

    focusLevel = Math.max(0, Math.min(100, focusLevel));

    // ========================================
    // LOGIC POWER (0-100)
    // Problem-solving capability
    // ========================================
    
    let logicPower = 40; // Base logic

    // Study hours impact
    if (inputs.studyHours >= 4 && inputs.studyHours <= 6) {
      logicPower += 40; // ⭐ Optimal learning
    } else if (inputs.studyHours >= 2 && inputs.studyHours < 4) {
      logicPower += 25; // 🟢 Learning mode
    } else if (inputs.studyHours > 6 && inputs.studyHours <= 8) {
      logicPower += 30; // 🟡 Heavy load
    } else if (inputs.studyHours > 8) {
      logicPower += 20 - (inputs.studyHours - 8) * 5; // 🔴 Burnout
    } else if (inputs.studyHours === 0) {
      logicPower += 0; // 💤 Idle
    } else {
      logicPower += inputs.studyHours * 8; // < 2 hours
    }

    // Sleep quality
    if (inputs.sleepHours >= 7 && inputs.sleepHours <= 8) {
      logicPower += 20; // ⭐ Optimal
    } else if (inputs.sleepHours >= 6 && inputs.sleepHours < 7) {
      logicPower += 10; // 🟡 Okay
    } else if (inputs.sleepHours < 6) {
      logicPower -= 20; // 🔴 Critical
    }

    // Stress impact
    if (inputs.stressLevel >= 2 && inputs.stressLevel <= 4) {
      logicPower += 5; // ⭐ Optimal pressure
    } else if (inputs.stressLevel >= 7) {
      logicPower -= (inputs.stressLevel - 6) * 8; // 🔴 High stress
    }

    logicPower = Math.max(0, Math.min(100, logicPower));

    // ========================================
    // BUG COUNT
    // More bugs with: High stress, bad sleep, excessive study
    // ========================================
    
    let bugCount = 0;

    // Sleep deprivation causes bugs
    if (inputs.sleepHours < 6) {
      bugCount += (6 - inputs.sleepHours) * 8; // 🔴 Brain fog, mistakes
    } else if (inputs.sleepHours > 9) {
      bugCount += 5; // 🟠 Oversleep - Low alertness
    }

    // Stress causes mistakes
    if (inputs.stressLevel >= 7) {
      bugCount += (inputs.stressLevel - 6) * 6; // 🔴 Panic, bad memory
    } else if (inputs.stressLevel >= 5) {
      bugCount += (inputs.stressLevel - 4) * 3; // 🟡 Exam pressure
    } else if (inputs.stressLevel <= 1) {
      bugCount += 5; // 😴 Too relaxed - Careless mistakes
    }

    // Excessive study causes mental fatigue bugs
    if (inputs.studyHours > 8) {
      bugCount += (inputs.studyHours - 8) * 4; // 🔴 Burnout
    }

    // Excessive coffee causes jittery mistakes
    if (inputs.coffeeIntake > 3) {
      bugCount += (inputs.coffeeIntake - 3) * 3; // 🔴 Anxiety, jittery
    }

    bugCount = Math.round(Math.max(0, bugCount));

    // ========================================
    // COFFEE DEPENDENCY (0-100%)
    // ========================================
    
    const coffeeDependency = Math.min(100, inputs.coffeeIntake * 12.5);

    // ========================================
    // BRAIN RAM USAGE (0-4 GB)
    // Depends on: Study (MOST), Stress (MEDIUM), Sleep & Coffee (LITTLE)
    // ========================================
    
    let brainRamUsage = 0.3; // Base idle usage

    // 📚 STUDY HOURS (MAIN FACTOR)
    if (inputs.studyHours === 0) {
      brainRamUsage += 0; // 💤 Idle
    } else if (inputs.studyHours >= 2 && inputs.studyHours < 4) {
      brainRamUsage += 0.8; // 🟢 Learning mode
    } else if (inputs.studyHours >= 4 && inputs.studyHours <= 6) {
      brainRamUsage += 1.5; // ⭐ Optimal learning
    } else if (inputs.studyHours > 6 && inputs.studyHours <= 8) {
      brainRamUsage += 2.2; // 🟡 Heavy load
    } else if (inputs.studyHours > 8) {
      brainRamUsage += 2.8 + (inputs.studyHours - 8) * 0.2; // 🔴 Burnout risk
    } else {
      brainRamUsage += inputs.studyHours * 0.4; // < 2 hours
    }

    // 😌 STRESS (MEDIUM IMPACT)
    if (inputs.stressLevel >= 7) {
      brainRamUsage += (inputs.stressLevel - 6) * 0.3; // 🔴 High stress adds load
    } else if (inputs.stressLevel >= 5) {
      brainRamUsage += 0.3; // 🟡 Moderate stress
    } else if (inputs.stressLevel >= 2 && inputs.stressLevel <= 4) {
      brainRamUsage += 0.1; // ⭐ Optimal pressure - Minimal load
    }

    // 🛌 SLEEP (LITTLE IMPACT)
    if (inputs.sleepHours < 6) {
      brainRamUsage += 0.3; // 🔴 Sleep deprivation increases mental load
    }

    // ☕ COFFEE (LITTLE IMPACT)
    if (inputs.coffeeIntake > 4) {
      brainRamUsage += 0.2; // 🔴 Jitters add processing overhead
    }

    brainRamUsage = Math.min(4, brainRamUsage);

    const newStats: Stats = {
      focusLevel: Math.round(focusLevel),
      logicPower: Math.round(logicPower),
      bugCount,
      coffeeDependency: Math.round(coffeeDependency),
      brainRamUsage: parseFloat(brainRamUsage.toFixed(1)),
    };

    // ========================================
    // GENERATE CONTEXTUAL ERROR LOGS
    // ========================================
    
    const newLogs: ErrorLogItem[] = [];

    // 🛌 SLEEP WARNINGS
    if (inputs.sleepHours < 6) {
      newLogs.push({
        type: "error",
        message: "🔴 CRITICAL: Sleep deprivation detected",
        details: `${inputs.sleepHours} hrs sleep - Brain fog, mistakes, stress. Get 7-8 hours tonight!`,
      });
    } else if (inputs.sleepHours >= 6 && inputs.sleepHours < 7) {
      newLogs.push({
        type: "warning",
        message: "🟡 WARNING: Sleep below optimal",
        details: `${inputs.sleepHours} hrs - Focus is okay but not peak. Aim for 7-8 hours.`,
      });
    } else if (inputs.sleepHours > 9) {
      newLogs.push({
        type: "warning",
        message: "🟠 INFO: Oversleep detected",
        details: `${inputs.sleepHours} hrs - May cause laziness and low alertness.`,
      });
    } else if (inputs.sleepHours >= 7 && inputs.sleepHours <= 8) {
      newLogs.push({
        type: "info",
        message: "⭐ OPTIMAL: Perfect sleep duration",
        details: `${inputs.sleepHours} hrs - Best focus and cognitive performance!`,
      });
    }

    // 📚 STUDY WARNINGS
    if (inputs.studyHours === 0) {
      newLogs.push({
        type: "info",
        message: "💤 IDLE: No study activity",
        details: "Brain is resting - ready for learning mode.",
      });
    } else if (inputs.studyHours > 10) {
      newLogs.push({
        type: "error",
        message: "🔴 DANGER: Excessive study hours",
        details: `${inputs.studyHours} hrs - Focus drops sharply! Take long breaks.`,
      });
    } else if (inputs.studyHours > 8 && inputs.studyHours <= 10) {
      newLogs.push({
        type: "error",
        message: "🔴 BURNOUT RISK: Too much studying",
        details: `${inputs.studyHours} hrs - Burnout incoming! Brain needs rest.`,
      });
    } else if (inputs.studyHours > 6 && inputs.studyHours <= 8) {
      newLogs.push({
        type: "warning",
        message: "🟡 HEAVY LOAD: Long study session",
        details: `${inputs.studyHours} hrs - Take 15-min breaks every 90 minutes!`,
      });
    } else if (inputs.studyHours >= 4 && inputs.studyHours <= 6) {
      newLogs.push({
        type: "info",
        message: "⭐ OPTIMAL: Perfect study duration",
        details: `${inputs.studyHours} hrs - Brain works best in chunks!`,
      });
    } else if (inputs.studyHours >= 2 && inputs.studyHours < 4) {
      newLogs.push({
        type: "info",
        message: "🟢 LEARNING MODE: Light study session",
        details: `${inputs.studyHours} hrs - Still productive, no stress.`,
      });
    }

    // ☕ COFFEE WARNINGS
    if (inputs.coffeeIntake > 5) {
      newLogs.push({
        type: "error",
        message: "🔴 CRITICAL: Excessive caffeine",
        details: `${inputs.coffeeIntake} cups - Jittery, more mistakes, poor sleep!`,
      });
    } else if (inputs.coffeeIntake > 3 && inputs.coffeeIntake <= 5) {
      newLogs.push({
        type: "warning",
        message: "🔴 WARNING: Too much caffeine",
        details: `${inputs.coffeeIntake} cups - Anxiety, poor sleep. Reduce to 1-2 cups.`,
      });
    } else if (inputs.coffeeIntake === 3) {
      newLogs.push({
        type: "info",
        message: "🟡 INFO: Acceptable caffeine intake",
        details: "3 cups - Still okay, but consider reducing.",
      });
    } else if (inputs.coffeeIntake >= 1 && inputs.coffeeIntake <= 2) {
      newLogs.push({
        type: "info",
        message: "✅ IDEAL: Perfect caffeine level",
        details: `${inputs.coffeeIntake} cup(s) - Boosts focus without side effects!`,
      });
    }

    // 😌 STRESS WARNINGS
    if (inputs.stressLevel >= 7) {
      newLogs.push({
        type: "error",
        message: "🔴 CRITICAL: High stress detected",
        details: `Level ${inputs.stressLevel}/10 - Mistakes, panic, bad memory. Practice relaxation!`,
      });
    } else if (inputs.stressLevel >= 5 && inputs.stressLevel <= 6) {
      newLogs.push({
        type: "warning",
        message: "🟡 ACCEPTABLE: Moderate stress",
        details: `Level ${inputs.stressLevel}/10 - Exam pressure detected. Take breaks!`,
      });
    } else if (inputs.stressLevel >= 2 && inputs.stressLevel <= 4) {
      newLogs.push({
        type: "info",
        message: "⭐ OPTIMAL: Healthy stress level",
        details: `Level ${inputs.stressLevel}/10 - Slight pressure, clear mind, motivated!`,
      });
    } else if (inputs.stressLevel <= 1) {
      newLogs.push({
        type: "warning",
        message: "😴 WARNING: Too relaxed",
        details: `Level ${inputs.stressLevel}/10 - Zero stress = laziness. Need some motivation!`,
      });
    }

    // 🐛 BUG COUNT WARNINGS
    if (newStats.bugCount > 40) {
      newLogs.push({
        type: "error",
        message: "🐛 CRITICAL: Extremely high error rate",
        details: `${newStats.bugCount} bugs - Review everything! Mental state is compromised.`,
      });
    } else if (newStats.bugCount > 25) {
      newLogs.push({
        type: "warning",
        message: "🐛 WARNING: High error count",
        details: `${newStats.bugCount} bugs - Take breaks between sessions.`,
      });
    } else if (newStats.bugCount <= 10) {
      newLogs.push({
        type: "info",
        message: "✅ EXCELLENT: Low error rate",
        details: `${newStats.bugCount} bugs - Great accuracy! Keep it up.`,
      });
    }

    // 🧠 RAM USAGE WARNINGS
    if (newStats.brainRamUsage > 3.5) {
      newLogs.push({
        type: "error",
        message: "🧠 ERROR: Brain RAM overload",
        details: `${newStats.brainRamUsage} GB / 4 GB - Mental capacity maxed! Stop and rest.`,
      });
    } else if (newStats.brainRamUsage > 2.5) {
      newLogs.push({
        type: "warning",
        message: "🧠 WARNING: High mental load",
        details: `${newStats.brainRamUsage} GB / 4 GB - Take breaks to prevent burnout.`,
      });
    } else if (newStats.brainRamUsage < 1.0) {
      newLogs.push({
        type: "info",
        message: "🧠 IDLE: Low brain activity",
        details: `${newStats.brainRamUsage} GB / 4 GB - Plenty of capacity available.`,
      });
    }

    // FOCUS LEVEL SUMMARY
    if (newStats.focusLevel >= 90) {
      newLogs.push({
        type: "info",
        message: "🎯 PEAK PERFORMANCE: Maximum focus achieved",
        details: "You're in the zone! Perfect conditions for deep work.",
      });
    } else if (newStats.focusLevel < 50) {
      newLogs.push({
        type: "error",
        message: "❌ LOW PERFORMANCE: Focus critically low",
        details: "Cognitive performance severely impaired - address issues ASAP!",
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
              
              {/* Status Labels */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 glass-effect rounded-2xl p-4 border border-white/10"
              >
                <h4 className="text-sm font-semibold mb-3 text-gray-300">Current Status</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Sleep:</span>
                    <span className="font-semibold">{getSleepLabel(inputs.sleepHours)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Study:</span>
                    <span className="font-semibold">{getStudyLabel(inputs.studyHours)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Stress:</span>
                    <span className="font-semibold">{getStressLabel(inputs.stressLevel)}</span>
                  </div>
                </div>
              </motion.div>
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
                          {stats.focusLevel >= 90
                            ? "🎯 Peak Performance"
                            : stats.focusLevel >= 70
                            ? "✅ Optimal"
                            : stats.focusLevel >= 50
                            ? "⚠️ Moderate"
                            : stats.focusLevel >= 30
                            ? "🔴 Low"
                            : "❌ Critical"}
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
                  {stats.focusLevel >= 90
                    ? "🎯 Excellent! You're operating at peak mental capacity. Your brain is in the zone - make the most of this optimal state!"
                    : stats.focusLevel < 50 && inputs.sleepHours < 7
                    ? "😴 Your focus is critically low due to insufficient sleep. Get 7-8 hours tonight to restore cognitive function."
                    : stats.coffeeDependency > 70
                    ? "☕ High coffee dependency detected. Consider reducing to 2-3 cups per day for sustainable energy."
                    : stats.bugCount > 40
                    ? "🐛 High error rate detected. Take a 15-minute break every 90 minutes during work sessions."
                    : inputs.stressLevel > 7
                    ? "😰 Stress levels are very high. Try deep breathing or a short walk to reduce cortisol."
                    : inputs.studyHours > 10
                    ? "📚 Extended work session detected. Productivity drops after 8 hours - spread work across multiple days."
                    : stats.brainRamUsage > 3.5
                    ? "🧠 Mental capacity nearly maxed. Take a 20-minute power nap to reset cognitive resources."
                    : "✅ Good! Your brain is performing well. Keep maintaining healthy habits."}
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
