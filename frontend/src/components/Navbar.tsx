import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  LogOut,
  Home,
  LayoutDashboard,
  ArrowLeft,
} from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token: string | null = localStorage.getItem("token");
  const userName: string | null = localStorage.getItem("userName");

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleBack = (): void => {
    navigate("/"); // Go back to Home
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 whitespace-nowrap">
          {/* LEFT SECTION */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Back Button - Only on Dashboard */}
            {location.pathname === "/dashboard" && (
              <motion.button
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="flex items-center px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 transition-all"
                title="Back to Home"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
            )}

            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Brain className="w-8 h-8 text-cyber-blue group-hover:text-cyber-purple transition-colors" />
                <div className="absolute inset-0 bg-cyber-blue/20 blur-xl group-hover:bg-cyber-purple/20 transition-colors" />
              </div>
              <span className="hidden sm:inline text-xl font-bold text-gradient">
                NeuroNix
              </span>
            </Link>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center space-x-6">
            {token ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-2 px-2 py-2 rounded-lg transition-all ${
                    location.pathname === "/dashboard"
                      ? "bg-cyber-blue/20 text-cyber-blue"
                      : "hover:bg-white/5 text-gray-300"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>

                <div className="flex items-center space-x-4">
                  <span className="hidden md:inline text-sm text-gray-400">
                    Hi,{" "}
                    <span className="text-cyber-blue font-semibold">
                      {userName}
                    </span>
                  </span>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    location.pathname === "/"
                      ? "bg-cyber-blue/20 text-cyber-blue"
                      : "hover:bg-white/5 text-gray-300"
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>

                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg hover:bg-white/5 text-gray-300 transition-all"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyber-blue to-cyber-purple hover:shadow-lg hover:shadow-cyber-blue/50 transition-all font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
