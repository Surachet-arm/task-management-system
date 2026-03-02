import React from "react";
import moment from "moment";

const TaskListTable = ({ tableData = [] }) => {

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-600 border border-green-200";
      case "Pending":
        return "bg-purple-100 text-purple-600 border border-purple-200";
      case "In Progress":
        return "bg-cyan-100 text-cyan-600 border border-cyan-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600 border border-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-600 border border-orange-200";
      case "Low":
        return "bg-green-100 text-green-600 border border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="pb-3">Name</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">Priority</th>
            <th className="pb-3">Created On</th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((task) => (
            <tr key={task._id} className="border-b hover:bg-gray-50">
              <td className="py-3 font-medium">{task.title}</td>

              <td>
                <span
                  className={`px-2 py-1 text-xs rounded inline-block ${getStatusBadgeColor(task.status)}`}
                >
                  {task.status}
                </span>
              </td>

              <td>
                <span
                  className={`px-2 py-1 text-xs rounded inline-block ${getPriorityBadgeColor(task.priority)}`}
                >
                  {task.priority}
                </span>
              </td>

              <td className="text-gray-500">
                {moment(task.createdAt).format("DD MMM YYYY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;