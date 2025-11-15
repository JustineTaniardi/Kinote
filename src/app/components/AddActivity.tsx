"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AddActivityProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddActivity({ isOpen, onClose }: AddActivityProps) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (isOpen) setRender(true);
    else setTimeout(() => setRender(false), 250);
  }, [isOpen]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const categories = [
    "Kerja",
    "Belajar",
    "Personal",
    "Kesehatan",
    "Kebersihan / Rumah",
    "Proyek",
    "Hiburan",
    "Olahraga",
    "Kreativitas",
    "Finance / Keuangan",
  ];

  const handleSave = () => {
    if (!category) {
      setCategoryError("Pilih kategori terlebih dahulu");
      return;
    }
    // For now, this component only matches AddToDo styling.
    // Integration (persisting the activity) can be added via props.
    console.log({ title, category, description });
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setCategoryError(null);
    onClose();
  };

  if (!render) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* overlay - reuse subtle darkening (AddToDo uses black/50) */}
        <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

        {/* Sidebar matching AddToDo design */}
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ x: "100%" }}
          animate={{ x: isOpen ? 0 : "100%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 flex flex-col transition-transform"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Masukkan Judul"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 text-lg font-semibold text-gray-800 bg-transparent placeholder-gray-400 focus:outline-none"
            />
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition ml-4">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {/* Category select */}
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <img src="/img/add-activity/category_icon.png" alt="Category" className="w-5 h-5 object-contain" />
              <select
                value={category}
                onChange={(e) => { setCategoryError(null); setCategory(e.target.value); }}
                className="flex-1 text-sm text-gray-700 bg-transparent focus:outline-none"
              >
                <option value="">Pilih Kategori...</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            {categoryError && <div className="text-sm text-red-600 px-3">{categoryError}</div>}

            {/* Description */}
            <div>
              <div className="py-1 text-sm text-gray-600">Tambahkan Deskripsi</div>
              <textarea
                placeholder="Masukkan deskripsi aktivitas..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
            <button onClick={handleClose} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">Batal</button>
            <button onClick={handleSave} className="flex-1 px-4 py-2.5 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition">Simpan</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
