import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

const TodoListInput = ({ todoList = [], setTodoList }) => {
  const [option, setOption] = useState("");

  // เพิ่มรายการ
  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...todoList, option.trim()]);
      setOption("");
    }
  };

  // ลบรายการ
  const handleDeleteOption = (index) => {
    const updatedArr = todoList.filter((_, idx) => idx !== index);
    setTodoList(updatedArr);
  };

  return (
    <div className="space-y-4">

      {/* List */}
      <div className="space-y-2">
        {todoList.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border border-gray-200"
          >
            <p className="flex items-center gap-3 text-sm text-gray-700">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold">
                {index + 1}
              </span>
              {item}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteOption(index)}
              className="text-gray-400 hover:text-red-500 transition"
            >
              <HiOutlineTrash size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Input + Add Button */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="กรอกรายการงาน..."
          value={option}
          onChange={(e) => setOption(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />

        <button
          type="button"
          onClick={handleAddOption}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm"
        >
          <HiMiniPlus size={18} />
          เพิ่ม
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;