import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-md p-10 space-y-10 bg-slate-900/70 backdrop-blur-2xl border border-slate-700/50 rounded-3xl shadow-2xl shadow-black/50">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Login
          </h1>
        </div>
        <form className="space-y-6" onSubmit={handleSignUp}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                ✉️
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-slate-500 transition-all outline-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Password
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔒
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-11 pr-12 py-3.5 bg-slate-800/50 border border-slate-700 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-slate-500 transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold text-lg rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/30"
          >
            Login
          </button>
        </form>
        <p className="text-center text-slate-500 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-500 font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
