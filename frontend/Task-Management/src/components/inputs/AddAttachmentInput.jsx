import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";

const AddAttachmentsInput = ({ attachments = [], setAttachments }) => {
  const [option, setOption] = useState("");

  // เพิ่มไฟล์ลิงก์
  const handleAddOption = () => {
    if (option.trim()) {
      setAttachments([...attachments, option.trim()]);
      setOption("");
    }
  };

  // ลบไฟล์
  const handleDeleteOption = (index) => {
    const updatedArr = attachments.filter((_, idx) => idx !== index);
    setAttachments(updatedArr);
  };

  return (
    <div className="space-y-4">

      {/* Attachment List */}
      <div className="space-y-2">
        {attachments.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-3 text-sm text-gray-700 truncate">
              <LuPaperclip className="text-indigo-500" />
              <a
                href={item}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline truncate max-w-[250px]"
              >
                {item}
              </a>
            </div>

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

      {/* Input + Add */}
      <div className="flex gap-3">
        <div className="flex items-center flex-1 border border-gray-300 rounded-lg px-3 focus-within:ring-2 focus-within:ring-indigo-500">
          <LuPaperclip className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="เพิ่มลิงก์ไฟล์..."
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="w-full py-2 focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleAddOption}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm"
        >
          <HiMiniPlus size={18} />
          เพิ่ม
        </button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;