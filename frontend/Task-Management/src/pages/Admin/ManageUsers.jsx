import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { LuFileSpreadsheet } from "react-icons/lu";
import UserCard from "../../components/card/UserCard";
import toast from "react-hot-toast";


const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        API_PATHS.USERS.GET_ALL_USERS
      );

      setAllUsers(response.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    try{
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS,{
        responseType: "blob"
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download","user_details.xlsx")
      document.body.appendChild(link)
      link.click()
      link.perentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    }catch(error){
     console.error("เกิดข้อผิดพลาดในการดาวน์โหลดรายงาน",error)
     toast.error("เกิดข้อผิดพลาดในการดาวน์โหลดรายงาน,โปรดลองอีกครั้ง") 
    }
  }
 
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">


        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Team Members
          </h2>

          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm"
          >
            <LuFileSpreadsheet className="text-lg" />
            Download Report
          </button>
        </div>


        {loading ? (
          <div className="text-center text-gray-500 py-10">
            Loading users...
          </div>
        ) : allUsers.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No team members found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allUsers.map((user) => (
              <UserCard key={user._id} userInfo={user} />
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;