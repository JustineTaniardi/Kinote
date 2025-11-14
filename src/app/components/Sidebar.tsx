import React from "react";

export default function Sidebar() {
  return (
    <div className="w-[220px] h-screen bg-[#F4F6F9] flex flex-col justify-between shadow-md">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-200">
          <img src="/img/logo/logo_dark.png" alt="logo" className="w-[150px] h-[45px]" />
        </div>

        {/* Menu */}
        <nav className="mt-4 flex flex-col gap-3 px-4 text-sm font-medium text-gray-700">
          <a
            href="#"
            className="flex items-center gap-3 py-2 px-3 rounded-lg bg-white shadow-sm"
          >
            <img
              src="/img/sidebar/streak_icon.png"
              alt="streak"
              className="w-5 h-6"
            />
            <span>Streak</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white"
          >
            <img
              src="/img/sidebar/todo_icon.png"
              alt="todo"
              className="w-5 h-3"
            />
            <span>To-do</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white"
          >
            <img
              src="/img/sidebar/calendar_icon.png"
              alt="calendar"
              className="w-5 h-5"
            />
            <span>Calendar</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white"
          >
            <img
              src="/img/sidebar/ai_icon.png"
              alt="ai"
              className="w-5 h-4 mt-[-3px]"
            />
            <span>Coach AI</span>
          </a>
        </nav>
      </div>

      {/* Log out */}
      <div className="px-6 py-4 border-t border-gray-200">
        <a
          href="#"
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600"
        >
          <img
            src="/img/sidebar/log-out_icon.png"
            alt="logout"
            className="w-5 h-5"
          />
          Log out
        </a>
      </div>
    </div>
  );
}
