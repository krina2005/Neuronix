// src/utils/cognitiveEngine.ts

export interface Inputs {
  sleepHours: number;
  studyHours: number;
  coffeeIntake: number;
  stressLevel: number;
}

export interface Stats {
  focusLevel: number;
  logicPower: number;
  bugCount: number;
  coffeeDependency: number;
  brainRamUsage: number;
}

export interface ErrorLogItem {
  type: string;
  message: string;
  details?: string;
}

export function calculateCognitiveStats(inputs: Inputs): {
  stats: Stats;
  logs: ErrorLogItem[];
} {
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

    return {
    stats: newStats,
    logs: newLogs,
    };
}
