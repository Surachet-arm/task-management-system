import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">
        
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Task Manager
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            จัดการงานของคุณอย่างมีประสิทธิภาพ
          </p>
        </div>

        {/* Content (Login / Register Form) */}
        {children}

      </div>
    </div>
  );
};

export default AuthLayout;