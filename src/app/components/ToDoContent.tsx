"use client";
import React, { useState } from "react";

// Interface untuk ToDo item
interface ToDoItem {
  id: number;
  status: string;
  judul: string;
  kategori: string;
  prioritas: string;
  deadline: string;
  description: string;
}

interface ToDoContentProps {
  onAddToDo?: () => void;
}

const ToDoContent: React.FC<ToDoContentProps> = ({ onAddToDo }) => {
  // Dummy data langsung di komponen
  const dummyToDos: ToDoItem[] = [
    {
      id: 1,
      status: "Sedang Dikerjakan",
      judul: "Ganti Oli",
      kategori: "Perawatan",
      prioritas: "Medium",
      deadline: "Jumat, 14 November 2025",
      description: "Ganti Oli Darda, sekalian cek angin ban",
    },
    {
      id: 2,
      status: "Sedang Dikerjakan",
      judul: "Ganti Oli",
      kategori: "Perawatan",
      prioritas: "Medium",
      deadline: "Jumat, 14 November 2025",
      description: "Ganti Oli Darda, sekalian cek angin ban",
    },
    {
      id: 3,
      status: "Sedang Dikerjakan",
      judul: "Ganti Oli",
      kategori: "Perawatan",
      prioritas: "Medium",
      deadline: "Jumat, 14 November 2025",
      description: "Ganti Oli Darda, sekalian cek angin ban",
    },
  ];

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isAllExpanded, setIsAllExpanded] = useState(true);
  const [isUnplannedExpanded, setIsUnplannedExpanded] = useState(true);

  // Handler untuk checkbox individual
  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handler untuk select all
  const handleSelectAll = () => {
    if (selectedItems.length === dummyToDos.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(dummyToDos.map((item) => item.id));
    }
  };

  // Helper function untuk warna priority
  const getPriorityColor = (priority: string): string => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-blue-100 text-blue-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex-1 bg-white p-8">
      {/* Search Bar */}
      <div className="w-full bg-[#F4F6F9] rounded-lg px-6 py-3 shadow-sm mb-6 flex items-center">
        <svg
          className="w-4 h-4 text-gray-400 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search for anything.."
          className="w-full bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
        />
      </div>

      {/* Filter & Sort Buttons */}
      <div className="flex gap-3 mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">
          <span className="text-lg">+</span>
          Filter
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">
          <span className="text-lg">+</span>
          Sort
        </button>
      </div>

      {/* Container dengan Background untuk Table & Button */}
      <div className="bg-[#F4F6F9] rounded-md p-6">
        {/* All Section */}
        <div className="mb-6">
          <button
            onClick={() => setIsAllExpanded(!isAllExpanded)}
            className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-700"
          >
            <span className={`transition-transform ${isAllExpanded ? "rotate-90" : ""}`}>
              ▶
            </span>
            All
            <span className="ml-1 px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs font-medium">
              {dummyToDos.length}
            </span>
          </button>

          {isAllExpanded && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[40px_1fr_120px_120px_120px_180px_1fr] gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === dummyToDos.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 cursor-pointer accent-black"
                  />
                </div>
                <div>Status</div>
                <div>Judul</div>
                <div>Tanggal</div>
                <div>Kategori</div>
                <div>Prioritas</div>
                <div>Deskripsi / Maksudmu Itu</div>
              </div>

              {/* Table Body */}
              {dummyToDos.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[40px_1fr_120px_120px_120px_180px_1fr] gap-4 px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition text-sm"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="w-4 h-4 cursor-pointer accent-black"
                    />
                  </div>
                  <div className="text-gray-700">{item.status}</div>
                  <div className="text-gray-700">{item.judul}</div>
                  <div className="text-gray-700">{item.deadline}</div>
                  <div className="text-gray-700">{item.kategori}</div>
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getPriorityColor(item.prioritas)}`}>
                      {item.prioritas}
                    </span>
                  </div>
                  <div className="text-gray-600 truncate">{item.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Unplanned Section */}
        <div className="mb-6">
          <button
            onClick={() => setIsUnplannedExpanded(!isUnplannedExpanded)}
            className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-700"
          >
            <span className={`transition-transform ${isUnplannedExpanded ? "rotate-90" : ""}`}>
              ▶
            </span>
            Unplanned
            <span className="ml-1 px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs font-medium">
              0
            </span>
          </button>

          {isUnplannedExpanded && (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-400 text-sm">
              No unplanned tasks
            </div>
          )}
        </div>

        {/* Add ToDo Button */}
        <button
          onClick={onAddToDo}
          className="w-full bg-white rounded-lg border border-gray-200 px-6 py-4 flex items-center gap-3 text-sm text-gray-600 hover:bg-gray-50 transition shadow-sm"
        >
          <span className="text-xl font-light text-gray-400">+</span>
          <span className="font-normal">Tambahkan Aktivitas</span>
        </button>
      </div>
      {/* End Container */}
    </div>
  );
};

export default ToDoContent;