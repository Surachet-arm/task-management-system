import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const SideMenu = ({ activeMenu }) => {
  const { user } = useContext(UserContext);

  const adminMenu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Create Task", path: "/admin/create-task" },
    { name: "Manage Task", path: "/admin/tasks" },
    { name: "Team Member", path: "/admin/users" },
  ];

  const userMenu = [
    { name: "Dashboard", path: "/user/dashboard" },
    { name: "My Tasks", path: "/user/tasks" },
  ];

  const menuItems =
    user?.role === "admin" ? adminMenu : userMenu;

  return (
    <div className="bg-white shadow-sm min-h-screen p-5 flex flex-col">
      
      {/* User Info */}
      <div className="mb-8 border-b pb-4">
        <p className="font-semibold text-gray-800">
          {user?.name}
        </p>
        <p className="text-sm text-gray-500">
          {user?.email}
        </p>
        <p className="text-xs text-indigo-600 mt-1 font-medium">
          {user?.role}
        </p>
      </div>

      {/* Menu */}
      <ul className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeMenu === item.name
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-indigo-100"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;