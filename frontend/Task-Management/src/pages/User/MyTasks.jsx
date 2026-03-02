import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import TaskCard from "../../components/card/TaskCard";

const MyTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [statusSummary, setStatusSummary] = useState({});

  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_ALL_TASKS,
        {
          params: {
            status: filterStatus === "All" ? "" : filterStatus,
          },
        }
      );

      setAllTasks(response.data?.tasks || []);
      setStatusSummary(response.data?.statusSummary || {});
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const handleClick = (taskId) => {
    navigate(`/user/task-details/${taskId}`);
  };

  useEffect(() => {
    getAllTasks();
  }, [filterStatus]);

  const tabs = [
    { label: "All", count: statusSummary.all || 0 },
    { label: "Pending", count: statusSummary.pendingTasks || 0 },
    { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
    { label: "Completed", count: statusSummary.completedTasks || 0 },
  ];

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="my-6">

        <div className="flex items-center gap-8 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setFilterStatus(tab.label)}
              className={`relative pb-3 text-sm font-medium transition ${
                filterStatus === tab.label
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="flex items-center gap-2">
                {tab.label}
                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${
                    filterStatus === tab.label
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              </span>

              {filterStatus === tab.label && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-indigo-600 rounded-full"></span>
              )}
            </button>
          ))}
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {allTasks.map((item) => (
          <TaskCard
            key={item._id}
            title={item.title}
            description={item.description}
            priority={item.priority}
            status={item.status}
            progress={item.progress}
            createdAt={item.createdAt}
            dueDate={item.dueDate}
            assignedTo={
              item.assignedTo?.map((user) => user.profileImageUrl) || []
            }
            attachmentCount={item.attachments?.length || 0}
            completedTodoCount={item.completedTodoCount || 0}
            todoChecklist={item.todoChecklist || []}
            onClick={() => handleClick(item._id)}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default MyTasks;