import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../layouts/Modal";
import { LuUsers } from "react-icons/lu";

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
    const [allUsers, setAllUsers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [tempSelectedUsers, setTempSelectedUsers] = useState([])

    const getAllUsers = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS)
            if (response.data?.length > 0) {
                setAllUsers(response.data)
            }
        } catch (error) {
            console.error("เรียกข้อมูลผิดพลาด", error)
        }
    }
    const toggleUserSelection = (userId) => {
        setTempSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        )
    }
    const handleAssign = () => {
        setSelectedUsers(tempSelectedUsers)
        setIsModalOpen(false)
    }
    const selectedUserAvatar = allUsers
        .filter((user) => selectedUsers.includes(user._id))
        .map((user) => user.profileImageUrl)
    useEffect(() => {
        getAllUsers()
    }, [])
    useEffect(() => {
        if (selectedUsers.length === 0) {
            setTempSelectedUsers([])
        }
        return () => { }
    }, [selectedUsers])
    return <div className="space-y-4 mt-2">
        {selectedUserAvatar.length === 0 && (
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition"
            >
                <LuUsers className="text-lg" />
                <span>เพิ่มสมาชิก</span>
            </button>
        )}

        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Select Users">
            <div className="space-y-4 h-[60vh] overflow-y-auto pr-2">
                {allUsers.map((user) => (
                    <div
                        key={user._id}
                        className="flex items-center gap-4 p-3 border-b border-gray-200 hover:bg-gray-50 transition rounded-lg"
                    >
                        {/* Profile Image */}
                        <img
                            src={user.profileImageUrl}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />

                        {/* User Info */}
                        <div className="flex-1">
                            <p className="font-medium text-gray-800">
                                {user.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>

                        {/* Checkbox */}
                        <input
                            type="checkbox"
                            checked={tempSelectedUsers.includes(user._id)}
                            onChange={() => toggleUserSelection(user._id)}
                            className="w-5 h-5 accent-indigo-600 cursor-pointer"
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                    ยกเลิก
                </button>

                <button
                    onClick={handleAssign}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-sm"
                >
                    ตกลง
                </button>
            </div>
        </Modal>
    </div>
}
export default SelectUsers