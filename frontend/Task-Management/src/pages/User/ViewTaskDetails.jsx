import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import { LuPaperclip } from "react-icons/lu";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-600 bg-cyan-50 border border-cyan-200";
      case "Completed":
        return "text-green-600 bg-green-50 border border-green-200";
      default:
        return "text-violet-600 bg-violet-50 border border-violet-200";
    }
  };

  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );
      setTask(response.data);
    } catch (error) {
      console.error("Error fetching task details", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTodoChecklist = async (index) => {
    try {
      const updatedChecklist = task.todoChecklist.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      );

      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(id),
        { todoChecklist: updatedChecklist }
      );

      setTask(response.data.task);
    } catch (error) {
      console.error("Error updating checklist", error);
    }
  };

  const handleConfirm = async () => {
    try {
      await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK_STATUS(id),
        { status: "Completed" }
      );
      navigate("/user/tasks");
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsByID();
    }
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout activeMenu="My Tasks">
        <div className="text-center py-20 text-gray-500">
          กำลังโหลดข้อมูล...
        </div>
      </DashboardLayout>
    );
  }

  if (!task) {
    return (
      <DashboardLayout activeMenu="My Tasks">
        <div className="text-center py-20 text-gray-400">
          ไม่พบข้อมูลงาน
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {task.title}
          </h2>

          <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusTagColor(
              task.status
            )}`}
          >
            {task.status}
          </span>
        </div>

        <p className="text-gray-600 mb-6">
          {task.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-xs text-gray-500">วันที่สร้าง</p>
            <p className="font-medium">
              {moment(task.createdAt).format("Do MMM YYYY")}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">กำหนดส่ง</p>
            <p className="font-medium">
              {moment(task.dueDate).format("Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">
            รายการสิ่งที่ต้องทำ
          </h3>

          <div className="space-y-3">
            {task.todoChecklist?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => updateTodoChecklist(index)}
                  className="w-4 h-4 accent-indigo-600"
                />

                <p
                  className={`text-sm ${
                    item.completed
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {task.attachments?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              ไฟล์แนบ
            </h3>

            <div className="space-y-2">
              {task.attachments.map((link, index) => (
                <div
                  key={index}
                  onClick={() => handleLinkClick(link)}
                  className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                >
                  <LuPaperclip className="text-gray-500" />
                  <span className="text-sm text-indigo-600 truncate">
                    {link}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={handleConfirm}
          className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md"
        >
          ตกลง
        </button>
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;