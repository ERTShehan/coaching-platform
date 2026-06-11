"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Calendar, Clock, Video } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [message, setMessage] = useState("Loading dashboard...");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("accessToken");
      
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("https://coaching-backend-k0np.onrender.com/api/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.code === 200) {
          setMessage(data.data);
        } else {
          setError("Failed to authenticate. Please log in again.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setTimeout(() => router.push("/login"), 2000);
        }
      } catch (err) {
        setError("Error connecting to the server.");
      }
    };

    fetchDashboardData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col bg-white rounded-[2.5rem] shadow-xl overflow-hidden h-full min-h-screen max-h-[90vh]">
      
      <header className="flex justify-between items-center p-6 border-b border-gray-100 bg-[#f4f5f0]">
        <h1 className="text-xl font-bold text-[#1a2e15]">Private Coaching</h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </header>

      <div className="flex-1 p-8 overflow-y-auto bg-white flex flex-col items-center">
        {error ? (
          <div className="text-red-500 bg-red-50 p-4 rounded-xl w-full text-center">
            {error}
          </div>
        ) : (
          <>
            <div className="text-center mb-10 w-full max-w-lg">
              <h2 className="text-3xl font-bold text-[#1a2e15] mb-4">Welcome Back</h2>
              <p className="text-gray-600 px-4 py-3 bg-[#e8f5df] rounded-2xl text-sm font-medium inline-block shadow-sm">
                {message}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <div className="bg-[#fcfdfa] border border-gray-100 p-6 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#e8f5df] rounded-full flex items-center justify-center mb-4 text-[#4a7d30]">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#1a2e15] mb-2">Book Session</h3>
                <p className="text-sm text-gray-500">Schedule your next one-on-one private session.</p>
                <button className="mt-4 bg-[#93d976] text-[#1a2e15] text-sm font-semibold px-6 py-2 rounded-full hover:bg-[#85c96b] transition-colors w-full">
                  Book Now
                </button>
              </div>

              <div className="bg-[#fcfdfa] border border-gray-100 p-6 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#e8f5df] rounded-full flex items-center justify-center mb-4 text-[#4a7d30]">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#1a2e15] mb-2">Upcoming</h3>
                <p className="text-sm text-gray-500">You have no upcoming sessions scheduled.</p>
                <button className="mt-4 bg-[#f5f5f0] text-gray-800 text-sm font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition-colors w-full">
                  View Schedule
                </button>
              </div>

              <div className="bg-[#fcfdfa] border border-gray-100 p-6 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#e8f5df] rounded-full flex items-center justify-center mb-4 text-[#4a7d30]">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#1a2e15] mb-2">Join Meeting</h3>
                <p className="text-sm text-gray-500">Your meeting link will appear here 5 mins before start.</p>
                <button disabled className="mt-4 bg-gray-100 text-gray-400 text-sm font-semibold px-6 py-2 rounded-full w-full cursor-not-allowed">
                  Join Room
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
    </div>
  );
}
