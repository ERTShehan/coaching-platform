"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, User, AlignLeft } from "lucide-react";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.code === 200) {
        setSuccess("Account created successfully! Please log in.");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data.data || "Registration failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm md:max-w-4xl mx-auto flex flex-col md:flex-row bg-white rounded-[2.5rem] shadow-xl overflow-y-auto overflow-x-hidden h-full min-h-96 max-h-[90vh]">
      
      <div className="hidden md:flex flex-col items-center justify-center p-8 w-1/2 bg-[#f4f5f0] border-r border-gray-200">
        <h2 className="text-3xl font-bold text-[#1a2e15] mb-4">Join Us Today</h2>
        <p className="text-gray-600 text-center px-6">
          Create an account to access exclusive one-on-one private coaching sessions tailored just for you.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center p-8 md:w-1/2 bg-white w-full overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#1a2e15] mb-8">Sign Up</h2>
        
        <form onSubmit={handleSignUp} className="w-full max-w-xs space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <AlignLeft className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#93d976] focus:ring-1 focus:ring-[#93d976] transition-colors bg-white text-gray-900"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#93d976] focus:ring-1 focus:ring-[#93d976] transition-colors bg-white text-gray-900"
              placeholder="Username"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#93d976] focus:ring-1 focus:ring-[#93d976] transition-colors bg-white text-gray-900"
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#93d976] focus:ring-1 focus:ring-[#93d976] transition-colors bg-white text-gray-900"
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
          {success && <p className="text-green-600 text-xs text-center">{success}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1e3b1c] text-white py-3.5 rounded-full font-medium hover:bg-[#142813] transition-colors disabled:opacity-70 mt-4"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-600">
          Already have an account? <Link href="/login" className="font-bold text-[#1a2e15] hover:underline">Log in</Link>
        </p>
      </div>

    </div>
  );
}
