"use client";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ToDoContent from "../components/ToDoContent";

export default function ToDoPage() {
  const [currentPath, setCurrentPath] = useState("/todo");

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
    console.log("Navigate to:", path);
    // TODO: Implementasi routing ke halaman lain
  };

  const handleLogout = () => {
    console.log("User logged out");
    // TODO: Implementasi logout
    // - Clear session/localStorage
    // - Redirect ke login page
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        userName="Adfa Kel"
        currentPath={currentPath}
        onNavigate={handleNavigation}
        onLogout={handleLogout}
      />
      
      {/* Main Content - Sidebar AddToDo sudah terintegrasi di dalam */}
      <ToDoContent />
    </div>
  );
}