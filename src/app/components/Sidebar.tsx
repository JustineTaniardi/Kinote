// import React from "react";

// export default function Sidebar() {
//   return (
//     <div className="w-[220px] h-screen bg-[#F4F6F9] flex flex-col justify-between shadow-md">
//       <div>
        // {/* Logo */}
        // <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-200">
        //   <img src="/img/logo/logo_dark.png" alt="logo" className="w-[150px] h-[45px]" />
        // </div>

//         {/* Menu */}
//         <nav className="mt-4 flex flex-col gap-3 px-4 text-sm font-medium text-gray-700">
//           <a
//             href="#"
//             className="flex items-center gap-3 py-2 px-3 rounded-lg bg-white shadow-sm"
//           >
//             <img
//               src="/img/sidebar/streak_icon.png"
//               alt="streak"
//               className="w-5 h-6"
//             />
//             <span>Streak</span>
//           </a>
//           <a
//             href="#"
//             className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white"
//           >
//             <img
//               src="/img/sidebar/todo_icon.png"
//               alt="todo"
//               className="w-5 h-3"
//             />
//             <span>To-do</span>
//           </a>
//           <a
//             href="#"
//             className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white"
//           >
//             <img
//               src="/img/sidebar/calendar_icon.png"
//               alt="calendar"
//               className="w-5 h-5"
//             />
//             <span>Calendar</span>
//           </a>
//           <a
//             href="#"
//             className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white"
//           >
//             <img
//               src="/img/sidebar/ai_icon.png"
//               alt="ai"
//               className="w-5 h-4 mt-[-3px]"
//             />
//             <span>Coach AI</span>
//           </a>
//         </nav>
//       </div>

//       {/* Log out */}
//       <div className="px-6 py-4 border-t border-gray-200">
//         <a
//           href="#"
//           className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600"
//         >
//           <img
//             src="/img/sidebar/log-out_icon.png"
//             alt="logout"
//             className="w-5 h-5"
//           />
//           Log out
//         </a>
//       </div>
//     </div>
//   );
// }



"use client";
import React, { useState, useEffect } from 'react';

// Interface untuk tipe menu item
interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

// Props untuk komponen Sidebar - UPDATE SESUAI PAGE.TSX
interface SidebarProps {
  userName?: string;
  userAvatar?: string;
  currentPath?: string;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  userName = 'Aqsa Kel',
  userAvatar,
  currentPath = '/streak',
  onNavigate,
  onLogout
}) => {
  const [showAnimation, setShowAnimation] = useState(false);

  // Menu items dengan path icon sesuai gambar
  const menuItems: MenuItem[] = [
    { id: 'streak', label: 'Streak', icon: '/img/sidebar/streak_icon.png', path: '/streak' },
    { id: 'todo', label: 'To-do', icon: '/img/sidebar/todo_icon.png', path: '/todo' },
    { id: 'coach-ai', label: 'Coach AI', icon: '/img/sidebar/ai_icon.png', path: '/coach-ai' },
    { id: 'calendar', label: 'Calendar', icon: '/img/sidebar/calendar_icon.png', path: '/calendar' }
  ];

  useEffect(() => {
    // Cek apakah ini first load dari sessionStorage
    const hasAnimated = sessionStorage.getItem('sidebarAnimated');
    
    if (!hasAnimated) {
      setShowAnimation(true);
      sessionStorage.setItem('sidebarAnimated', 'true');
    }
  }, []);

  const handleMenuClick = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const handleLogout = () => {
    // Clear animation flag saat logout
    sessionStorage.removeItem('sidebarAnimated');
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div 
      className={`
        w-[225px] bg-[#F4F6F9] rounded-md shadow-sm border border-gray-200
        flex flex-col justify-between
        my-4 ml-4 p-2
        ${showAnimation ? 'animate-slideDown' : ''}
      `}
      style={{ height: 'calc(100vh - 300px)' }}
    >
      {/* Header dengan Logo */}
      <div className="p-4">
        {/* Logo */}
        <div className="gap-2 py-5 border-b border-gray-200">
          <img src="/img/logo/logo_dark.png" alt="logo" className="w-[110px] h-[30px]" />
        </div>

        {/* Menu Items */}
        <nav className="space-y-1 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.path)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-md
                text-sm font-normal transition-colors duration-150
                ${currentPath === item.path
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <img 
                src={item.icon} 
                alt={item.label}
                className="w-4 h-4 object-contain"
              />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Footer dengan Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="
            w-full flex items-center gap-3 px-3 py-2.5 rounded-md
            text-sm font-normal text-red-600 hover:bg-red-50
            transition-colors duration-150
          "
        >
          <img 
            src="/img/sidebar/log-out_icon.png" 
            alt="Log out"
            className="w-4 h-4 object-contain"
          />
          <span>Log out</span>
        </button>
      </div>

      {/* Custom CSS untuk animasi */}
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

// PENTING: Export Sidebar, BUKAN SidebarDemo!
export default Sidebar;