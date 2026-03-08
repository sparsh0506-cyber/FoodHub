import { useState } from "react";
import axios from "axios";
 
const API_URL = "http://localhost:2500/api/user";
 
export default function LoginSignup({ open, mode, close, setMode }) {
  const isSignup = mode === "signup";
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 
  if (!open) return null;
 
  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
 
    try {
      const url = isSignup
        ? `${API_URL}/register`
        : `${API_URL}/login`;
 
      const payload = isSignup
        ? { name, email, password: pass }
        : { email, password: pass };
 
      const res = await axios.post(url, payload);
 
      if (res.data.success) {
        // token save
        localStorage.setItem("token", res.data.token);
 
        if (isSignup) {
          // signup ke baad login screen
          setMode("login");
          setName("");
          setEmail("");
          setPass("");
        } else {
          // login success
          close();
        }
      } else {
        setError(res.data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Server error, please try again");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]">
      {/* MODAL */}
      <div className="bg-white dark:bg-[#0E1116] w-[90%] max-w-sm rounded-2xl p-6 relative shadow-xl">
 
        {/* CLOSE */}
        <button
          onClick={close}
          className="absolute top-3 right-4 text-xl text-gray-500"
        >
          ✕
        </button>
 
        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {isSignup ? "Create Account" : "Login"}
        </h2>
 
        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border
                bg-white dark:bg-[#0E1116]
                text-gray-900 dark:text-white
                border-gray-300 dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          )}
 
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg border
              bg-white dark:bg-[#0E1116]
              text-gray-900 dark:text-white
              border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
 
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg border
              bg-white dark:bg-[#0E1116]
              text-gray-900 dark:text-white
              border-gray-300 dark:border-gray-600
              focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
 
          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
 
          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : isSignup
              ? "Sign Up"
              : "Login"}
          </button>
        </form>
 
        {/* TOGGLE */}
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          {isSignup ? "Already have an account?" : "New here?"}
          <button
            type="button"
            onClick={() => setMode(isSignup ? "login" : "signup")}
            className="text-orange-500 font-semibold ml-1"
          >
            {isSignup ? "Login" : "Create account"}
          </button>
        </p>
      </div>
    </div>
  );
}