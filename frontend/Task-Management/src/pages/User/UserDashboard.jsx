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

const UserDashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getGreeting = () => {
    const hour = moment().hour();
    if (hour < 12) return "สวัสดีตอนเช้า";
    if (hour < 18) return "สวัสดีตอนบ่าย";
    return "สวัสดีตอนเย็น";
  };

  const prepareChartData = (charts) => {
    const distribution = charts?.taskDistribution || {};

    const data = [
      { status: "Pending", count: distribution.Pending || 0 },
      { status: "In Progress", count: distribution.InProgress || 0 },
      { status: "Completed", count: distribution.Completed || 0 },
    ];

    setPieChartData(data);
  };

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_USER_DASHBOARD_DATA
      );

      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts);
      }
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="text-center py-20 text-gray-500">
          กำลังโหลดข้อมูล...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="Dashboard">

      {/* Greeting */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800">
          {getGreeting()}  {user?.name}
        </h2>

        <p className="text-gray-500 mt-1">
          {moment().format("dddd, Do MMMM YYYY")}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">

          <StatCard label="งานทั้งหมด" value={total} color="text-gray-800" />

          <StatCard
            label="รอดำเนินการ"
            value={pending}
            color="text-violet-600"
          />

          <StatCard
            label="กำลังดำเนินการ"
            value={inProgress}
            color="text-cyan-600"
          />

          <StatCard
            label="เสร็จสิ้น"
            value={completed}
            color="text-green-600"
          />

        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          สัดส่วนงาน
        </h3>

        {total === 0 ? (
          <div className="text-center text-gray-400 py-10">
            ยังไม่มีข้อมูลงาน
          </div>
        ) : (
          <div className="flex justify-center">
            <CustomPieCharts data={pieChartData} colors={COLORS} />
          </div>
        )}
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-6 text-gray-800">
          งานล่าสุดของคุณ
        </h3>

        <TaskListTable
          tableData={dashboardData?.recentTasks || []}
        />
      </div>

    </DashboardLayout>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className="text-center">
    <p className={`text-2xl font-bold ${color}`}>
      {value}
    </p>
    <p className="text-xs text-gray-500 mt-1">
      {label}
    </p>
  </div>
);

export default UserDashboard;