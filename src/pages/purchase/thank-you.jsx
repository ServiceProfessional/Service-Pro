import React from "react";
import { useRouter } from "next/router";

const ThankYouPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0a0c1b] text-white">
      <div className="bg-[#101223] p-10 rounded-lg shadow-lg text-center border border-[#1f213b]">
        <h1 className="text-4xl font-bold text-[#00d09c] mb-4">
          Thank You for Your Purchase!
        </h1>
        <p className="text-gray-400 mb-6">
          Your support means a lot to us. Enjoy using Service Pro, and feel free to reach out if you need any assistance.
        </p>
        <button
          onClick={() => router.push("/")} // Navigate to home
          className="bg-[#007aff] text-white px-8 py-3 rounded-lg hover:bg-[#005ed1] transition-all duration-200"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
