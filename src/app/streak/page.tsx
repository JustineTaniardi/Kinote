import React from "react";
import Sidebar from "../components/Sidebar";
import StreakContent from "../components/StreakContent";

export default function StreakPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <StreakContent />
    </div>
  );
}
