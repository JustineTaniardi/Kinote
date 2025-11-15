"use client";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import StreakContent from "../components/StreakContent";
import AddActivity from "../components/AddActivity";



export default function StreakPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#F8FAFB]">
      <Sidebar />
      <StreakContent onOpenAddActivity={() => setIsOpen(true)} />

      {/* Sidebar muncul hanya jika isOpen = true */}
      {/* {isOpen && (
        <AddActivity
          onClose={() => setIsOpen(false)}/>
        )} */}
      
    </div>
    
  );
}
