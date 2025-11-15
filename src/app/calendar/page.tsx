"use client";

import { useState, useCallback, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarGrid from "../components/calendar/CalendarGrid";
import { TaskItem, ViewMode } from "../components/calendar/types";

export default function CalendarPage() {
  const [weekStart, setWeekStart] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  });
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    // Create sample data for current week (Nov 16-22, 2025)
    const today = new Date();
    return [
      {
        id: "1",
        title: "Belajar TypeScript",
        startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0).toISOString(),
        endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30).toISOString(),
        difficulty: "medium",
      },
      {
        id: "2",
        title: "Rapat Tim",
        startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0).toISOString(),
        endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0).toISOString(),
        difficulty: "easy",
      },
      {
        id: "3",
        title: "Debugging Code",
        startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 14, 0).toISOString(),
        endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 16, 30).toISOString(),
        difficulty: "hard",
      },
    ];
  });
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch tasks from API or localStorage
  const fetchTasks = useCallback(async () => {
    try {
      // Try to fetch from API when it's available
      // const response = await fetch("/api/tasks");
      // if (response.ok) {
      //   const data = await response.json();
      //   setTasks(data);
      // }

      // For now, use mock data or localStorage
      const savedTasks = localStorage.getItem("kinote_tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddActivity = async (data: {
    name: string;
    startTime: string;
    endTime: string;
    date: string;
    difficulty: "easy" | "medium" | "hard";
  }) => {
    setIsLoading(true);
    try {
      const [startHour, startMin] = data.startTime.split(":").map(Number);
      const [endHour, endMin] = data.endTime.split(":").map(Number);

      const startDateTime = new Date(data.date);
      startDateTime.setHours(startHour, startMin, 0, 0);

      const endDateTime = new Date(data.date);
      endDateTime.setHours(endHour, endMin, 0, 0);

      const newTask: TaskItem = {
        id: Date.now().toString(),
        title: data.name,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        difficulty: data.difficulty,
      };

      // Try to send to API when available
      // const response = await fetch("/api/tasks", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(newTask),
      // });

      // if (response.ok) {
      //   const createdTask = await response.json();
      //   setTasks([...tasks, createdTask]);
      // }

      // For now, add to state and localStorage
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("kinote_tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error adding activity:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Calendar Header with Controls */}
          <CalendarHeader
            weekStart={weekStart}
            onWeekChange={setWeekStart}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onAddActivity={handleAddActivity}
            isLoading={isLoading}
          />

          {/* Calendar Grid */}
          <CalendarGrid
            weekStart={weekStart}
            events={tasks}
            viewMode={viewMode}
          />
        </div>
      </main>
    </div>
  );
}
