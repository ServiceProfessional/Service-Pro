import React from "react";
import { useRouter } from "next/router";

const PurchaseCancelledPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0a0c1b] text-white">
      <div className="bg-[#101223] p-10 rounded-lg shadow-lg text-center border border-[#1f213b]">
        <h1 className="text-4xl font-bold text-[#ff5c5c] mb-4">
          Purchase Cancelled
        </h1>
        <p className="text-gray-400 mb-6">
          We're sorry to see you go! If there's anything we can improve or
          assist with, please let us know.
        </p>
        <button
          onClick={() => router.push("/")} // Navigate back to purchase page
          className="bg-[#007aff] text-white px-8 py-3 rounded-lg hover:bg-[#005ed1] transition-all duration-200"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default PurchaseCancelledPage;
