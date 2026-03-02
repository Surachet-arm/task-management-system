import React from "react";

const AvatarGroup = ({ avatars = [], maxVisible = 3 }) => {
  const visibleAvatars = avatars.slice(0, maxVisible);
  const remaining = avatars.length - maxVisible;

  return (
    <div className="flex items-center">


      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className="relative group"
          style={{ marginLeft: index === 0 ? 0 : -10 }}
        >
          <img
            src={avatar}
            alt={`Avatar ${index + 1}`}
            className="w-9 h-9 rounded-full border-2 border-white shadow-sm object-cover transition-transform duration-200 group-hover:scale-110"
          />
        </div>
      ))}


      {remaining > 0 && (
        <div
          className="w-9 h-9 flex items-center justify-center rounded-full 
          bg-indigo-100 text-indigo-600 text-xs font-semibold border-2 border-white shadow-sm"
          style={{ marginLeft: -10 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;