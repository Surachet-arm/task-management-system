import React from "react";

const UserCard = ({ userInfo }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 p-6">


      <div className="flex items-center gap-4">
        <img
          src={userInfo?.profileImageUrl}
          alt="avatar"
          className="w-14 h-14 rounded-full object-cover border-2 border-indigo-100"
        />

        <div>
          <p className="text-base font-semibold text-gray-800">
            {userInfo?.name}
          </p>
          <p className="text-sm text-gray-500">
            {userInfo?.email}
          </p>
        </div>
      </div>


      <div className="border-t border-gray-100 my-5"></div>

 
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
};

export default UserCard;

const StatCard = ({ label, count, status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case "In Progress":
        return "bg-cyan-50 text-cyan-600";
      case "Completed":
        return "bg-green-50 text-green-600";
      default:
        return "bg-violet-50 text-violet-600";
    }
  };

  return (
    <div className={`rounded-xl py-3 text-center ${getStatusStyle()} transition`}>
      <p className="text-lg font-semibold">{count}</p>
      <p className="text-[11px] font-medium mt-1">{label}</p>
    </div>
  );
};