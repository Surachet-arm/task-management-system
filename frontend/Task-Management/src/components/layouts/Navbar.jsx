import React from "react";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">
        Task Manager
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;