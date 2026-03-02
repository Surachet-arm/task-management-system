import React, { useContext, useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import TaskListTable from "../../components/TaskListTable";
import CustomPieCharts from "../../components/charts/CustomPieCharts";

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);

  const getGreeting = () => {
    const hour = moment().hour();
    if (hour < 12) return "สวัสดีตอนเช้า";
    if (hour < 18) return "สวัสดีตอนบ่าย";
    return "สวัสดีตอนเย็น";
  };

  const prepareChartData = (charts) => {
    const distribution = charts?.taskDistribution || {};

    const data = [
      { status: "รอดำเนินการ", count: distribution.Pending || 0 },
      { status: "กำลังดำเนินการ", count: distribution.InProgress || 0 },
      { status: "เสร็จสิ้น", count: distribution.Completed || 0 },
    ];

    setPieChartData(data);
  };

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );

      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูลแดชบอร์ด", error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const distribution = dashboardData?.charts?.taskDistribution || {};

  const pending = distribution.Pending || 0;
  const inProgress = distribution.InProgress || 0;
  const completed = distribution.Completed || 0;
  const total = pending + inProgress + completed;

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-2xl font-semibold">
          {getGreeting()} {user?.name}
        </h2>

        <p className="text-gray-500">
          {moment().format("วันdddd ที่ Do MMMM YYYY")}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          <div className="text-center">
            <p className="text-2xl font-bold">{total}</p>
            <p className="text-xs text-gray-500">งานทั้งหมด</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-violet-600">{pending}</p>
            <p className="text-xs text-gray-500">รอดำเนินการ</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-cyan-600">{inProgress}</p>
            <p className="text-xs text-gray-500">กำลังดำเนินการ</p>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{completed}</p>
            <p className="text-xs text-gray-500">เสร็จสิ้นแล้ว</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-center">
          <CustomPieCharts data={pieChartData} colors={COLORS} />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">งานล่าสุด</h3>

        <TaskListTable
          tableData={dashboardData?.recentTasks || []}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;