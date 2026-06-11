"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, UserCircle } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.code === 200) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        router.push("/dashboard");
      } else {
        setError(data.data || "Invalid email or password");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/guest", {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok && data.code === 200) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Could not log in as guest");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm md:max-w-4xl mx-auto flex flex-col md:flex-row bg-white rounded-[2.5rem] shadow-xl overflow-y-auto overflow-x-hidden h-full min-h-[600px] max-h-[90vh]">
      
      <div className="hidden md:flex flex-col items-center justify-center p-8 w-1/2 bg-[#f4f5f0] border-r border-gray-200">
        <h2 className="text-3xl font-bold text-[#1a2e15] mb-4">Welcome Back!</h2>
        <p className="text-gray-600 text-center px-6">
          Log in to access your confidential one-on-one private coaching sessions and continue your journey.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center p-8 md:w-1/2 bg-white w-full overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#1a2e15] mb-8">Login</h2>
        
        <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#93d976] focus:ring-1 focus:ring-[#93d976] transition-colors bg-white text-gray-900"
              placeholder="Email"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#93d976] focus:ring-1 focus:ring-[#93d976] transition-colors bg-white text-gray-900"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <div className="text-right w-full">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-800 underline transition-colors">Forgot Password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1e3b1c] text-white py-3.5 rounded-full font-medium hover:bg-[#142813] transition-colors disabled:opacity-70"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center w-full max-w-xs my-6">
          <div className="flex-1 border-t border-gray-100"></div>
          <span className="px-4 text-xs text-gray-400 bg-white">or</span>
          <div className="flex-1 border-t border-gray-100"></div>
        </div>

        <div className="w-full max-w-xs space-y-3">
          <button className="w-full flex items-center justify-center gap-3 bg-[#f5f5f0] text-gray-800 py-3 rounded-full font-medium hover:bg-[#93d976] hover:text-[#1a2e15] transition-colors text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          
          <button className="w-full flex items-center justify-center gap-3 bg-[#f5f5f0] text-gray-800 py-3 rounded-full font-medium hover:bg-[#93d976] hover:text-[#1a2e15] transition-colors text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.8 1.19.04 2.15.42 2.89 1.12-2.58 1.4-2.14 4.54.44 5.56-.63 1.94-1.33 3.46-1.91 4.29v.01z" fill="currentColor"/>
              <path d="M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.02 4.41-3.74 4.25z" fill="currentColor"/>
            </svg>
            Continue with Apple
          </button>

          <button onClick={handleGuestLogin} type="button" className="w-full flex items-center justify-center gap-3 bg-[#f5f5f0] text-gray-800 py-3 rounded-full font-medium hover:bg-[#93d976] hover:text-[#1a2e15] transition-colors text-sm">
            <UserCircle className="w-5 h-5" />
            Continue As Guest
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-600">
          Need an account? <Link href="/signup" className="font-bold text-[#1a2e15] hover:underline">Sign up</Link>
        </p>
      </div>

    </div>
  );
}
