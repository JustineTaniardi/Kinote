"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import AddActivity from "./AddActivity";
import StreakSearchBar from "./StreakSearchBar";
import StreakActivityCard from "./StreakActivityCard";
import StreakWeeklyColumn from "./StreakWeeklyColumn";
import StreakTimerWidget from "./StreakTimerWidget";
import StreakDetailSidebar from "./StreakDetailSidebar";
import { StreakEntry } from "./StreakTypes";

interface Props {
  onOpenAddActivity?: () => void;
}

const sampleEntries: StreakEntry[] = [
  {
    id: 1,
    title: "Olahraga",
    category: "Olahraga",
    subcategory: "Basket",
    totalMinutes: 30,
    breakTime: "10 menit",
    description: "Durasi 30 min - Break 10 min - Streak 6",
    lastUpdated: new Date().toISOString(),
    status: "Belum Dimulai",
    days: ["Sabtu", "Minggu"],
  },
  {
    id: 2,
    title: "Belajar Koding",
    category: "Belajar",
    subcategory: "Frontend",
    totalMinutes: 50,
    breakTime: "10 menit",
    description: "Fokus session - JavaScript & React",
    lastUpdated: new Date().toISOString(),
    status: "Belum Dimulai",
    days: ["Senin", "Rabu", "Jumat"],
  },
  {
    id: 3,
    title: "Belajar Gitar",
    category: "Belajar",
    subcategory: "Music",
    totalMinutes: 30,
    breakTime: "10 menit",
    description: "Practice scales and chords",
    lastUpdated: new Date().toISOString(),
    status: "Belum Dimulai",
    days: ["Kamis", "Minggu"],
  },
  {
    id: 4,
    title: "Latihan Bulu Tangkis",
    category: "Olahraga",
    totalMinutes: 60,
    breakTime: "15 menit",
    description: "Morning court time",
    lastUpdated: new Date().toISOString(),
    status: "Belum Dimulai",
    days: ["Sabtu"],
  },
];

export default function StreakContent({ onOpenAddActivity }: Props) {
  const [tab, setTab] = useState<"blog" | "weekly">("blog");
  const [entries, setEntries] = useState<StreakEntry[]>(sampleEntries);
  const [searchQuery, setSearchQuery] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [timerOpen, setTimerOpen] = useState(false);
  const [timerMode, setTimerMode] = useState<"fokus" | "istirahat">("fokus");
  const [timerFor, setTimerFor] = useState<StreakEntry | null>(null);
  const [detailEntry, setDetailEntry] = useState<StreakEntry | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Filter entries by search query
  const filteredEntries = useMemo(() => {
    return entries.filter((e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [entries, searchQuery]);

  // Group entries by day for weekly view
  const weeklyGrouped = useMemo(() => {
    const days = [
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
      "Minggu",
    ];
    const grouped: Record<string, StreakEntry[]> = {};

    days.forEach((day) => {
      grouped[day] = filteredEntries.filter((e) => e.days?.includes(day) ?? false);
    });

    return days.map((day) => ({ day, activities: grouped[day] }));
  }, [filteredEntries]);

  const openDetail = (entry: StreakEntry) => {
    setDetailEntry(entry);
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setDetailOpen(false);
    setDetailEntry(null);
  };

  const handleStart = (entry: StreakEntry) => {
    setTimerFor(entry);
    setTimerMode("fokus");
    setTimerOpen(true);
  };

  const handleFinishTimer = (seconds: number) => {
    const minutes = Math.round(seconds / 60);
    if (!timerFor) return;

    const payload: StreakEntry = {
      id: entries.length + 1,
      title: timerFor.title,
      category: timerFor.category,
      subcategory: timerFor.subcategory,
      totalMinutes: minutes,
      breakTime: timerFor.breakTime,
      lastUpdated: new Date().toISOString(),
      description: `Completed ${minutes} min`,
      date: new Date().toISOString(),
      status: "Selesai",
      days: timerFor.days,
    };

    setEntries((prev) => [...prev, payload]);
    setTimerOpen(false);
    setTimerFor(null);
  };

  const handleDelete = (id: number) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const handleEdit = (updated: StreakEntry) => {
    setEntries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const handleSaveActivity = (payload: any) => {
    const minutes = Number(payload.totalTime || 0);
    const entry: StreakEntry = {
      id: entries.length + 1,
      title: payload.title || "Untitled",
      category: payload.category,
      subcategory: payload.subcategory,
      totalMinutes: minutes,
      breakTime: payload.breakTime,
      lastUpdated: new Date().toISOString(),
      description: payload.description || "",
      date: new Date().toISOString(),
      status: "Belum Dimulai",
      days: payload.days || [],
    };
    setEntries((prev) => [...prev, entry]);
    setOpenAdd(false);
  };

  return (
    <div className="flex-1 bg-white p-8">
      {/* Search Bar at the very top */}
      <StreakSearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Tabs below search */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setTab("blog")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            tab === "blog"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Blog
        </button>
        <button
          onClick={() => setTab("weekly")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            tab === "weekly"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Weekly
        </button>
      </div>

      {/* Content: Blog Tab - Grid layout with wrapping */}
      {tab === "blog" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <div key={entry.id} className="w-full h-44">
                <StreakActivityCard
                  entry={entry}
                  onOpen={openDetail}
                  onStart={handleStart}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400">
              <p>No activities found</p>
            </div>
          )}
        </div>
      )}

      {/* Content: Weekly Tab - 7 columns with horizontal scroll */}
      {tab === "weekly" && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {weeklyGrouped.map(({ day, activities }) => (
              <StreakWeeklyColumn
                key={day}
                day={day}
                activities={activities}
                onOpen={openDetail}
                onStart={handleStart}
              />
            ))}
          </div>
        </div>
      )}

      {/* Add Button */}
      <div className="mt-8">
        <button
          onClick={() => setOpenAdd(true)}
          className="w-full bg-white rounded-lg border border-gray-200 px-6 py-4 flex items-center gap-3 text-sm text-gray-600 hover:bg-gray-50 transition shadow-sm"
        >
          <span className="text-xl font-light text-gray-400">+</span>
          <span className="font-normal">Tambahkan Aktivitas</span>
        </button>
      </div>

      {/* Add Activity Sidebar */}
      <AnimatePresence>
        {openAdd && (
          <AddActivity
            isOpen={openAdd}
            onClose={() => setOpenAdd(false)}
            onSave={handleSaveActivity}
          />
        )}
      </AnimatePresence>

      {/* Floating Timer Widget */}
      <AnimatePresence>
        {timerOpen && timerFor && (
          <StreakTimerWidget
            isOpen={timerOpen}
            mode={timerMode}
            title={timerFor.title}
            duration={timerFor.totalMinutes}
            repetition={1}
            onClose={() => setTimerOpen(false)}
            onFinish={handleFinishTimer}
          />
        )}
      </AnimatePresence>

      {/* Detail Sidebar */}
      <StreakDetailSidebar
        isOpen={detailOpen}
        onClose={closeDetail}
        entry={detailEntry}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
