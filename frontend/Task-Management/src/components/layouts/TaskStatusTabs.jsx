import React from "react";

const TaskStatusTabs = ({ tabs = [], activeTab, setActiveTab }) => {
  return (
    <div className="my-4">
      <div className="flex gap-6 border-b border-gray-200">

        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;

          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`relative pb-3 text-sm font-medium transition
                ${isActive
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <div className="flex items-center gap-2">

                {/* Tab Label */}
                <span>{tab.label}</span>

                {/* Count Badge */}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full transition
                    ${isActive
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {tab.count}
                </span>
              </div>

              {/* Active Indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full"></div>
              )}
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default TaskStatusTabs;