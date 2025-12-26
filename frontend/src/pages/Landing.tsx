import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Cpu,
  Coffee,
  Bug,
  Gauge,
  Activity,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Gauge,
      title: "Focus Meter",
      description: "Track your concentration levels in real-time like a CPU monitor",
      color: "blue",
    },
    {
      icon: Activity,
      title: "Brain RAM Usage",
      description: "Monitor your mental capacity and cognitive load",
      color: "purple",
    },
    {
      icon: Bug,
      title: "Bug Count",
      description: "Keep track of errors in your thinking process",
      color: "yellow",
    },
    {
      icon: Coffee,
      title: "Coffee Dependency",
      description: "Measure your caffeine-fueled productivity boost",
      color: "orange",
    },
    {
      icon: Cpu,
      title: "Logic Power",
      description: "Analyze your problem-solving capabilities",
      color: "green",
    },
    {
      icon: Sparkles,
      title: "System Analytics",
      description: "Get insights into your brain's performance patterns",
      color: "pink",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-darker relative overflow-hidden">
      <Navbar />

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl"
        />
      </div>

      {/* Hero */}
      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-6"
            >
              <Brain className="w-24 h-24 text-cyber-blue mx-auto" strokeWidth={1.5} />
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">NeuroNix</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Monitor Your Brain Like a System
            </p>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Track your cognitive performance with real-time metrics.
              Optimize your focus, manage your mental load, and boost productivity.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-purple hover:shadow-2xl hover:shadow-cyber-blue/50 transition-all font-semibold text-lg flex items-center space-x-2"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signup")}
              className="px-8 py-4 rounded-xl glass-effect border border-white/20 hover:border-cyber-blue/50 transition-all font-semibold text-lg"
            >
              Get Started Free
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Features */}
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              System Features
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to optimize your brain
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              const colorClasses: Record<string, string> = {
                blue: "from-cyber-blue/20 to-transparent border-cyber-blue/30 text-cyber-blue",
                purple: "from-cyber-purple/20 to-transparent border-cyber-purple/30 text-cyber-purple",
                yellow: "from-yellow-500/20 to-transparent border-yellow-500/30 text-yellow-400",
                orange: "from-orange-500/20 to-transparent border-orange-500/30 text-orange-400",
                green: "from-green-500/20 to-transparent border-green-500/30 text-green-400",
                pink: "from-pink-500/20 to-transparent border-pink-500/30 text-pink-400",
              };

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${colorClasses[feature.color]} border backdrop-blur-xl group`}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[feature.color]} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 py-8 border-t border-white/10 text-center text-gray-400">
        © 2024 CS Brain Dashboard. Monitor your brain, optimize your life.
      </div>
    </div>
  );
};

export default Landing;
