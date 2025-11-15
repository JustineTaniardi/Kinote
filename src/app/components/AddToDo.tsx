"use client";
import React, { useState, useEffect } from "react";

interface AddToDoProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ToDoFormData) => void;
}

interface ToDoFormData {
  judul: string;
  kategori: string;
  prioritas: string;
  tanggal: string;
  deskripsi: string;
}

const AddToDo: React.FC<AddToDoProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ToDoFormData>({
    judul: "",
    kategori: "",
    prioritas: "Medium",
    tanggal: "",
    deskripsi: "",
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSubmit = () => {
    // Validate category selected
    if (!formData.kategori) {
      setCategoryError("Pilih kategori terlebih dahulu");
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
    }
    handleClose();
  };

  const handleInputChange = (field: keyof ToDoFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const priorityOptions = [
    { value: "Rendah", label: "Rendah" },
    { value: "Medium", label: "Medium" },
    { value: "Tinggi", label: "Tinggi" },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isAnimating ? "opacity-50" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header - Judul sebagai Input Field */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Masukkan Judul"
            value={formData.judul}
            onChange={(e) => handleInputChange("judul", e.target.value)}
            className="flex-1 text-lg font-semibold text-gray-800 bg-transparent placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition ml-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Status removed from form - handled internally on creation */}

          {/* Category Select (required) */}
          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
            <img
              src="/img/add-activity-todo/category_icon.png"
              alt="Category"
              className="w-5 h-5 object-contain"
            />
            <select
              value={formData.kategori}
              onChange={(e) => {
                setCategoryError(null);
                handleInputChange("kategori", e.target.value);
              }}
              className="flex-1 text-sm text-gray-700 bg-transparent placeholder-gray-400 focus:outline-none"
            >
              <option value="">Pilih Kategori...</option>
              <option>Kerja</option>
              <option>Belajar</option>
              <option>Personal</option>
              <option>Kesehatan</option>
              <option>Kebersihan / Rumah</option>
              <option>Proyek</option>
              <option>Hiburan</option>
              <option>Olahraga</option>
              <option>Kreativitas</option>
              <option>Finance / Keuangan</option>
            </select>
          </div>
          {categoryError && <div className="text-sm text-red-600 px-3">{categoryError}</div>}

          {/* Prioritas Dropdown dengan Design Baru */}
          <div className="relative">
            <div
              onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <img
                src="/img/add-activity-todo/prioritas_icon.png"
                alt="Prioritas"
                className="w-5 h-5 object-contain"
              />
              <span className="flex-1 text-sm text-gray-700">{formData.prioritas}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Dropdown Menu Prioritas */}
            {showPriorityDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                <div className="py-1 text-sm text-gray-500 px-3 border-b">Pilih salah satu</div>
                {priorityOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      handleInputChange("prioritas", option.value);
                      setShowPriorityDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tanggal Input */}
          <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
            <img
              src="/img/add-activity-todo/calendar_icon.png"
              alt="Tanggal"
              className="w-5 h-5 object-contain"
            />
            <input
              type="date"
              value={formData.tanggal}
              onChange={(e) => handleInputChange("tanggal", e.target.value)}
              className="flex-1 text-sm text-gray-700 bg-transparent focus:outline-none cursor-pointer"
            />
          </div>

          {/* Deskripsi Label - TANPA HOVER */}
          <div className="py-1 text-sm text-gray-600">
            Tambahkan Deskripsi
          </div>

          {/* Deskripsi Textarea */}
          <div>
            <textarea
              placeholder="Masukkan deskripsi aktivitas..."
              value={formData.deskripsi}
              onChange={(e) => handleInputChange("deskripsi", e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2.5 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            Simpan
          </button>
        </div>
      </div>
    </>
  );
};

export default AddToDo;