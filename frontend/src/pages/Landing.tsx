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
      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          {/* Social Media Icons */}
          <div className="flex justify-center items-center gap-6 mb-6">
            {/* GitHub */}
            <a
              href="https://github.com/krina2005/Neuronix"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group"
            >
              <div className="p-3 rounded-full bg-white/5 backdrop-blur
                              transition-all duration-300
                              group-hover:bg-white/10
                              group-hover:shadow-[0_0_20px_rgba(255,255,255,0.35)]">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-400 group-hover:text-white transition"
                >
                  <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.57.11.78-.25.78-.56v-2.02c-3.2.7-3.87-1.38-3.87-1.38-.53-1.36-1.29-1.72-1.29-1.72-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.52.11-3.16 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 5.83 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.64.23 2.86.11 3.16.75.81 1.2 1.85 1.2 3.11 0 4.43-2.68 5.4-5.24 5.68.41.36.77 1.06.77 2.14v3.17c0 .31.21.67.79.56A11.52 11.52 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5Z" />
                </svg>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/krina-parmar-a1b3622b9/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group"
            >
              <div className="p-3 rounded-full bg-white/5 backdrop-blur
                              transition-all duration-300
                              group-hover:bg-cyber-blue/20
                              group-hover:shadow-[0_0_20px_rgba(0,200,255,0.45)]">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-400 group-hover:text-cyber-blue transition"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.22 8.98h4.56V24H.22V8.98ZM8.98 8.98h4.37v2.05h.06c.61-1.16 2.1-2.37 4.33-2.37 4.63 0 5.48 3.05 5.48 7.02V24h-4.56v-6.97c0-1.66-.03-3.8-2.31-3.8-2.32 0-2.67 1.81-2.67 3.68V24H8.98V8.98Z" />
                </svg>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/krina__2005/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group"
            >
              <div
                className="p-3 rounded-full bg-white/5 backdrop-blur
                          transition-all duration-300
                          group-hover:bg-pink-500/20
                          group-hover:shadow-[0_0_20px_rgba(236,72,153,0.45)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-400 group-hover:text-pink-400 transition"
                >
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.06 1.97.25 2.43.42.61.23 1.05.5 1.51.96.46.46.73.9.96 1.51.17.46.36 1.26.42 2.43.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.17-.25 1.97-.42 2.43-.23.61-.5 1.05-.96 1.51-.46.46-.9.73-1.51.96-.46.17-1.26.36-2.43.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.17-.06-1.97-.25-2.43-.42-.61-.23-1.05-.5-1.51-.96-.46-.46-.73-.9-.96-1.51-.17-.46-.36-1.26-.42-2.43C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.17.25-1.97.42-2.43.23-.61.5-1.05.96-1.51.46-.46.9-.73 1.51-.96.46-.17 1.26-.36 2.43-.42C8.4 2.2 8.8 2.2 12 2.2zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.9a1.45 1.45 0 1 1 0 2.9 1.45 1.45 0 0 1 0-2.9z" />
                </svg>
              </div>
            </a>

          </div>

          {/* Branding */}
          <p className="text-gray-500 text-sm mb-2">
            Made with <span className="text-red-400">❤️</span> by{" "}
            <a
              href="https://www.linkedin.com/in/krina-parmar-a1b3622b9/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyber-blue font-semibold hover:underline hover:text-cyber-purple transition"
            >
              Krina Parmar
            </a>
          </p>

          {/* Copyright */}
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} CS Brain Dashboard. Monitor your brain, optimize your life.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
