"use client";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ToDoContent from "../components/ToDoContent";

export default function ToDoPage() {
  const [currentPath, setCurrentPath] = useState("/todo");

  const handleAddToDo = () => {
    console.log("Open Add ToDo Modal");
    // TODO: Implementasi modal untuk add ToDo
  };

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
    console.log("Navigate to:", path);
  };

  const handleLogout = () => {
    console.log("User logged out");
    // Implementasi logout
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
      
      {/* Main Content */}
      <ToDoContent onAddToDo={handleAddToDo} />
    </div>
  );
}