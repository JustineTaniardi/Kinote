"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AddToDo from "./AddToDo";
import AddActivity from "./AddActivity";
import ActivityModal from "./ActivityModal";

// Interface untuk ToDo item
interface ToDoItem {
  id: number;
  status: string;
  judul: string;
  kategori: string;
  prioritas: string;
  deadline: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  subcategory?: string;
  days?: string[];
  totalTime?: string;
  repeatCount?: string;
  breakTime?: string;
}

interface ToDoFormData {
  judul: string;
  kategori: string;
  prioritas: string;
  tanggal: string;
  deskripsi: string;
}

// CSS untuk split strike-through animation
const strikeStyles = `
  .row-transition {
    transition: all 0.35s cubic-bezier(.2,.8,.2,1);
  }
  /* Full-row single-line strike (appears across the entire row) */
  .row-completed {
    position: relative;
  }
  .row-completed::after {
    content: '';
    position: absolute;
    left: 8px;
    right: 8px;
    top: 50%;
    height: 2px;
    background-color: rgba(0,0,0,0.18);
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

const ToDoContent: React.FC = () => {
  // Inject CSS for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = strikeStyles;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // State untuk sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isActivitySidebarOpen, setIsActivitySidebarOpen] = useState(false);
  
  // State untuk edit cell
  const [editingCell, setEditingCell] = useState<{
    id: number;
    field: 'status' | 'kategori' | 'prioritas';
  } | null>(null);

  // Click outside handler untuk close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check jika click di luar dropdown
      if (!target.closest('.dropdown-cell')) {
        setEditingCell(null);
      }
    };

    if (editingCell) {
      // Gunakan timeout agar tidak langsung close saat baru dibuka
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingCell]);

  // State untuk todos
  const [todos, setTodos] = useState<ToDoItem[]>([
    {
      id: 1,
      status: "Belum Dimulai",
      judul: "Ganti Oli",
      kategori: "Perawatan",
      prioritas: "Medium",
      deadline: "Jumat, 14 November 2025",
      description: "Ganti Oli Darda, sekalian cek angin ban",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      status: "Belum Dimulai",
      judul: "Ganti Oli",
      kategori: "Perawatan",
      prioritas: "Medium",
      deadline: "Jumat, 14 November 2025",
      description: "Ganti Oli Darda, sekalian cek angin ban",
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      status: "Belum Dimulai",
      judul: "Ganti Oli",
      kategori: "Perawatan",
      prioritas: "Medium",
      deadline: "Jumat, 14 November 2025",
      description: "Ganti Oli Darda, sekalian cek angin ban",
      createdAt: new Date().toISOString(),
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isAllExpanded, setIsAllExpanded] = useState(true);
  const [isUnplannedExpanded, setIsUnplannedExpanded] = useState(true);

  // Handler untuk checkbox individual
  const handleSelectItem = (id: number) => {
    const isCurrentlySelected = selectedItems.includes(id);
    
    // Update selected items
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    
    // Move completed item to bottom and update status
    if (!isCurrentlySelected) {
      setTodos((prev) => {
        const selectedItem = prev.find((item) => item.id === id);
        if (!selectedItem) return prev;
        const remaining = prev.filter((item) => item.id !== id);
        // Update status to 'Selesai' when marked as complete and set updatedAt
        const completedItem = { ...selectedItem, status: "Selesai", updatedAt: new Date().toISOString() };
        return [...remaining, completedItem];
      });
    } else {
      // Restore status to 'Belum Dimulai' when unchecked and clear updatedAt
      setTodos((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "Belum Dimulai", updatedAt: undefined } : item
        )
      );
    }
  };

  // Handler untuk select all
  const handleSelectAll = () => {
    if (selectedItems.length === todos.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(todos.map((item) => item.id));
    }
  };

  // Helper function untuk warna priority
  const getPriorityColor = (priority: string): string => {
    switch (priority.toLowerCase()) {
      case "high":
      case "tinggi":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-blue-100 text-blue-700";
      case "low":
      case "rendah":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Handler untuk submit form dari AddToDo
  const handleSubmitToDo = (data: ToDoFormData) => {
    console.log("New ToDo Data:", data);
    const newToDo: ToDoItem = {
      id: todos.length + 1,
      status: "Belum Dimulai",
      judul: data.judul,
      kategori: data.kategori,
      prioritas: data.prioritas,
      deadline: data.tanggal,
      description: data.deskripsi,
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, newToDo]);
  };

  // Handler for AddActivity full form
  const handleSaveActivity = (payload: any) => {
    console.log('New Activity payload:', payload);
    const newToDo: ToDoItem = {
      id: todos.length + 1,
      status: payload.status ?? 'Belum Dimulai',
      judul: payload.title || payload.judul || 'Untitled',
      kategori: payload.category || payload.kategori || '',
      prioritas: payload.prioritas || 'Medium',
      subcategory: payload.subcategory || '',
      days: payload.days || [],
      totalTime: payload.totalTime || payload.total_time || '',
      repeatCount: payload.repeatCount || payload.repeat || '',
      breakTime: payload.breakTime || payload.break || '',
      deadline: payload.date || payload.tanggal || '',
      description: payload.description || payload.deskripsi || '',
      createdAt: new Date().toISOString(),
    };
    setTodos(prev => [...prev, newToDo]);
  };

  // Handler untuk update cell value
  const handleUpdateCell = (id: number, field: 'status' | 'kategori' | 'prioritas', value: string) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
    setEditingCell(null);
  };

  // Options untuk dropdown
  const statusOptions = ["Belum Dimulai", "Sedang Dikerjakan", "Selesai"];
  const priorityOptions = ["Rendah", "Medium", "Tinggi"];
  const kategoriOptions = [
    "Kerja",
    "Belajar",
    "Personal",
    "Kesehatan",
    "Kebersihan / Rumah",
    "Proyek",
    "Hiburan",
    "Olahraga",
    "Kreativitas",
    "Finance / Keuangan"
  ];
  
  // Modal state for viewing activity details
  const [selectedActivity, setSelectedActivity] = useState<ToDoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openActivityModal = (item: ToDoItem) => {
    setSelectedActivity(item);
    setIsModalOpen(true);
  };

  const closeActivityModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
  };

  const handleDeleteActivity = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    setSelectedItems((prev) => prev.filter((sid) => sid !== id));
  };

  const handleEditActivity = (updated: ToDoItem) => {
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? { ...t, ...updated } : t)));
    // keep selected state and ordering as-is; checkbox remains the only trigger for completion
    setSelectedActivity(updated);
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
      <div className="bg-[#F8FAFB] rounded-xl p-6">
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
              {todos.length}
            </span>
          </button>

          {isAllExpanded && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-visible">
              {/* Table Header */}
              <div className="grid grid-cols-[40px_1fr_120px_120px_120px_180px_1fr] gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600">
                <div />
                <div>Status</div>
                <div>Judul</div>
                <div>Tanggal</div>
                <div>Kategori</div>
                <div>Prioritas</div>
                <div>Deskripsi / Maksudmu Itu</div>
              </div>

              {/* Table Body */}
              {todos.map((item) => (
                <motion.div
                  layout
                  transition={{ layout: { duration: 0.28 } }}
                  key={item.id}
                  onClick={() => openActivityModal(item)}
                  className={`row-transition grid grid-cols-[40px_1fr_120px_120px_120px_180px_1fr] gap-4 px-4 py-4 border-b border-gray-100 hover:bg-gray-50 text-sm ${
                    selectedItems.includes(item.id) ? "bg-gray-200 row-completed text-gray-700" : "bg-white text-gray-700"
                  }`}
                >
                  {/* Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 cursor-pointer accent-black"
                    />
                  </div>
                  
                  {/* Status - Text Only (Non-Editable) */}
                  <div className="relative text-gray-700">
                    <span className="inline-block px-3 py-1.5 rounded bg-gray-100">
                      {item.status}
                    </span>
                  </div>
                  
                  <div className="text-gray-700">{item.judul}</div>
                  <div className="text-gray-700">{item.deadline}</div>
                  
                  {/* Kategori - Editable (disabled when completed) */}
                  <div className={`relative dropdown-cell ${selectedItems.includes(item.id) ? "" : ""}`}>
                    <div
                      onClick={(e) => { e.stopPropagation(); if (!selectedItems.includes(item.id)) setEditingCell({ id: item.id, field: 'kategori' }); }}
                      className={`cursor-pointer hover:bg-gray-200 bg-gray-100 px-3 py-1.5 rounded transition inline-block ${
                        selectedItems.includes(item.id) ? "opacity-70" : ""
                      }`}
                    >
                      {item.kategori}
                    </div>
                    {editingCell?.id === item.id && editingCell?.field === 'kategori' && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-20 w-48 max-h-100 overflow-y-auto">
                        <div className="py-1 text-xs text-gray-500 px-2 border-b">Pilih salah satu</div>
                        {kategoriOptions.map((option) => (
                          <button
                            key={option}
                            onClick={(e) => { e.stopPropagation(); handleUpdateCell(item.id, 'kategori', option); }}
                            className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Prioritas - Editable (disabled when completed) */}
                  <div className="relative dropdown-cell">
                    <div
                      onClick={(e) => { e.stopPropagation(); if (!selectedItems.includes(item.id)) setEditingCell({ id: item.id, field: 'prioritas' }); }}
                      className="cursor-pointer inline-block"
                    >
                      <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getPriorityColor(item.prioritas)} hover:opacity-80 transition ${
                        selectedItems.includes(item.id) ? "opacity-70" : ""
                      }`}>
                        {item.prioritas}
                      </span>
                    </div>
                    {editingCell?.id === item.id && editingCell?.field === 'prioritas' && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-20 min-w-max">
                        <div className="py-1 text-xs text-gray-500 px-2 border-b whitespace-nowrap">Pilih salah satu</div>
                        {priorityOptions.map((option) => (
                          <button
                            key={option}
                            onClick={(e) => { e.stopPropagation(); handleUpdateCell(item.id, 'prioritas', option); }}
                            className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100"
                          >
                            <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getPriorityColor(option)}`}>
                              {option}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className={`truncate ${selectedItems.includes(item.id) ? "text-gray-700" : "text-gray-600"}`}>{item.description}</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Add Buttons: Full AddActivity (left) and Quick AddToDo (right) */}
        <div className="flex gap-3">
          <button
            onClick={() => setIsActivitySidebarOpen(true)}
            className="flex-1 bg-white rounded-lg border border-gray-200 px-6 py-4 flex items-center gap-3 text-sm text-gray-600 hover:bg-gray-50 transition shadow-sm cursor-pointer"
          >
            <span className="text-xl font-light text-gray-400">+</span>
            <span className="font-normal">Tambahkan Aktivitas Lengkap</span>
          </button>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="w-48 bg-white rounded-lg border border-gray-200 px-4 py-4 flex items-center gap-3 text-sm text-gray-600 hover:bg-gray-50 transition shadow-sm cursor-pointer"
          >
            <span className="text-xl font-light text-gray-400">+</span>
            <span className="font-normal">Quick ToDo</span>
          </button>
        </div>
      </div>
      {/* End Container */}

      {/* Add ToDo Sidebar */}
      <AddToDo
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSubmit={handleSubmitToDo}
      />
      <AddActivity
        isOpen={isActivitySidebarOpen}
        onClose={() => setIsActivitySidebarOpen(false)}
        onSave={handleSaveActivity}
      />
      {/* Activity Modal */}
      <ActivityModal
        isOpen={isModalOpen}
        onClose={closeActivityModal}
        item={selectedActivity}
        onDelete={(id) => { handleDeleteActivity(id); closeActivityModal(); }}
        onEdit={(updated) => { handleEditActivity(updated); }}
      />
    </div>
  );
};

export default ToDoContent;