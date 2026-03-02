import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { PRIORITY_DATA } from '../../utils/data'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { LuTrash2 } from 'react-icons/lu'
import SelectDropdown from '../../components/inputs/SelectDropdown'
import SelectUsers from '../../components/inputs/SelectUser'
import TodoListInput from '../../components/inputs/TodoListInput'
import AddAttachmentsInput from '../../components/inputs/AddAttachmentInput'
import Modal from '../../components/layouts/Modal'
import DeleteAlert from '../../components/layouts/DeleteAlert'

const Createtask = () => {

  const location = useLocation()
  const { taskId } = location.state || {}
  const navigate = useNavigate()


  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  })

  const [currentTask, setCurrentTask] = useState(null)

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }))
  }
  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    })
  }
  const createTask = async () => {
    setLoading(true)

    try {
      const todolist = taskData.todoChecklist?.map((item) => ({
        text: item,
        completed: false,
      }))
      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist
      })
      toast.success("สร้างงานเรียบร้อย")
      clearData()

    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการสร้าง", error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  const updateTask = async () => {
    setLoading(true)

    try {
      const todolist = taskData.todoChecklist?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklist || []
        const matchedTask = prevTodoChecklist.find((task) => task.text == item)

        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false
        }
      })
      const response = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId),
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoChecklist: todolist
        }
      )
      toast.success("อัพเดตงานเรียบร้อย")
    } catch (error) {
      console.error("เกิดปัญหาในการสร้าง", error)
    } finally {
      setLoading(false)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!taskData.title.trim()) {
      setError("กรุณากรอก หัวข้องาน")
      return
    }
    if (!taskData.description.trim()) {
      setError("กรุณากรอก รายละเอียดงาน")
      return
    }
    if (!taskData.dueDate.trim()) {
      setError("กรุณากรอก วันที่")
      return
    }
    if (taskData.assignedTo.length === 0) {
      setError("กรุณากรอกเพิ่มบุคคลที่มอบหมายงาน")
      return
    }
    if (taskData.assignedTo.length === 0) {
      setError("กรุณากรอกเพิ่มบุคคลที่มอบหมายงาน")
      return
    }
    if (taskId) {
      await updateTask();
    } else {
      await createTask();
    }
  }
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);

        setTaskData({
          title: taskInfo.title || "",
          description: taskInfo.description || "",
          priority: taskInfo.priority || "Low",
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : "",
          assignedTo:
            taskInfo?.assignedTo?.map((item) => item?._id) || [],
          todoChecklist:
            taskInfo?.todoChecklist?.map((item) => item?.text) || [],
          attachments: taskInfo.attachments || [],
        });
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", error);
    }
  };
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId))
      setOpenDeleteAlert(false)
      toast.success("ลบงานที่มอบหมายเรียบร้อย")
      navigate('/admin/task')
    } catch (error) {
      console.error(
        "เกิดปัญหาในการลบ",
        error.response?.data?.message || error.message
      )
    }
  }

  useEffect(() => {
    if (taskId) {
      getTaskDetailsByID()
    }
    return () => { }
  }, [taskId])
  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

        <h2 className="text-2xl font-semibold mb-6">
          Create Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ชื่องาน
            </label>
            <input
              type="text"
              value={taskData.title}
              onChange={(e) =>
                handleValueChange("title", e.target.value)
              }
              placeholder="สร้างงาน"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              รายละเอียด
            </label>
            <textarea
              rows="4"
              value={taskData.description}
              onChange={(e) =>
                handleValueChange("description", e.target.value)
              }
              placeholder="รายละเอียดงาน"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            />
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ระดับความสำคัญ
              </label>

              <SelectDropdown
                options={PRIORITY_DATA}
                value={taskData.priority}
                onChange={(value) =>
                  handleValueChange("priority", value)
                }
                placeholder="Select Priority"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                กำหนดส่ง
              </label>
              <input
                type="date"
                value={taskData.dueDate || ""}
                onChange={(e) =>
                  handleValueChange("dueDate", e.target.value)
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              มอบหมายให้
            </label>

            <SelectUsers
              selectedUsers={taskData.assignedTo}
              setSelectedUsers={(value) =>
                handleValueChange("assignedTo", value)
              }
            />
          </div>

          <div className=''>
            <label className=''>
              รายการสิ่งที่ต้องทำ (เช็คลิสต์)
            </label>
            <TodoListInput
              todoList={taskData?.todoChecklist}
              setTodoList={(value) =>
                handleValueChange("todoChecklist", value)
              }
            />
          </div>
          <div className=''>
            <label className=''>
              เพิ่มไฟล์แนบ
            </label>
            <AddAttachmentsInput
              attachments={taskData?.attachments}
              setAttachments={(value) =>
                handleValueChange("attachments", value)
              }
            />
          </div>
          {error && (
            <p className='text-xs font-medium text-red-500 mt-5'>{error}</p>
          )}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-sm"
            >
              {taskId ? "UPDATE TASK" : "CREATE TASK"}
            </button>
          </div>

        </form>
      </div>
      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="ลบงานมอบหมาย"
      >
        <DeleteAlert content="ต้องการยืนยันที่จะลบงาน ?"
          onDelete={() => deleteTask()}
        />
      </Modal>
    </DashboardLayout>
  )
}

export default Createtask