import React from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">

        <div className="w-64">
          <SideMenu activeMenu={activeMenu} />
        </div>


        <main className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-120px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;