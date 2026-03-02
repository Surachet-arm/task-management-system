import React from "react";

const Progress = ({ progress = 0, status }) => {

  const getColor = () => {
    switch (status) {
      case "In Progress":
        return "bg-cyan-500";
      case "Completed":
        return "bg-green-500";
      case "Pending":
        return "bg-violet-500";
      default:
        return "bg-gray-400";
    }
  };

  const getTextColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-600";
      case "Completed":
        return "text-green-600";
      case "Pending":
        return "text-violet-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="w-full space-y-1">


      <div className={`text-xs font-medium ${getTextColor()}`}>
        {progress}%
      </div>


      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">


        <div
          className={`h-2 rounded-full transition-all duration-500 ${getColor()}`}
          style={{ width: `${progress}%` }}
        />

      </div>
    </div>
  );
};

export default Progress;