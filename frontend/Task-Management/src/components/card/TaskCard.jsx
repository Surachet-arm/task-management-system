import React from "react";
import moment from "moment";
import { LuPaperclip } from "react-icons/lu";
import AvatarGroup from "./AvatarGroup"
import Progress from "./Progress";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo = [],
  attachmentCount = 0,
  completedTodoCount = 0,
  todoChecklist = [],
  onClick,
}) => {

  const getStatusColor = () => {
    switch (status) {
      case "In Progress":
        return "bg-cyan-100 text-cyan-600";
      case "Completed":
        return "bg-green-100 text-green-600";
      default:
        return "bg-violet-100 text-violet-600";
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600";
      case "Medium":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-green-100 text-green-600";
    }
  };

  const getBorderColor = () => {
    switch (status) {
      case "In Progress":
        return "border-cyan-500";
      case "Completed":
        return "border-green-500";
      default:
        return "border-violet-500";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white rounded-2xl shadow-sm border-l-[4px] ${getBorderColor()} p-5 hover:shadow-md transition-all duration-200`}
    >

      {/* Header */}
      <div className="flex justify-between items-start mb-4">

        <div className="space-y-2">
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor()}`}>
            {status}
          </span>

          <span className={`text-xs px-3 py-1 rounded-full font-medium ${getPriorityColor()}`}>
            {priority} Priority
          </span>
        </div>

      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
        {description}
      </p>

      {/* Todo Progress */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">
          Task Done:{" "}
          <span className="font-medium text-gray-700">
            {completedTodoCount} / {todoChecklist.length || 0}
          </span>
        </p>

        <Progress progress={progress} status={status} />
      </div>

      {/* Dates */}
      <div className="flex justify-between text-xs text-gray-500 mb-4">
        <div>
          <p className="font-medium text-gray-600">Start Date</p>
          <p>{moment(createdAt).format("Do MMM YYYY")}</p>
        </div>

        <div className="text-right">
          <p className="font-medium text-gray-600">Due Date</p>
          <p>{moment(dueDate).format("Do MMM YYYY")}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">

        <AvatarGroup avatars={assignedTo} />

        {attachmentCount > 0 && (
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <LuPaperclip />
            {attachmentCount}
          </div>
        )}

      </div>

    </div>
  );
};

export default TaskCard;