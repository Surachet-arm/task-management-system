import React from "react";
import { LuTrash2 } from "react-icons/lu";

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div className="space-y-6">

      {/* Warning Message */}
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-red-100">
          <LuTrash2 className="text-red-600 text-lg" />
        </div>

        <div>
          <h3 className="text-base font-semibold text-gray-800">
            ยืนยันการลบ
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {content}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          ยกเลิก
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 active:scale-95 transition-all duration-200 shadow-sm"
        >
          <LuTrash2 />
          ลบรายการ
        </button>

      </div>
    </div>
  );
};

export default DeleteAlert;