"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
}

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ToDoItem | null;
  onDelete: (id: number) => void;
  onEdit: (updated: ToDoItem) => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ isOpen, onClose, item, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<ToDoItem | null>(null);

  useEffect(() => {
    setIsEditing(false);
    setForm(item ? { ...item } : null);
  }, [item]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleDelete = () => {
    if (!item) return;
    if (confirm("Hapus aktivitas ini?")) {
      onDelete(item.id);
      onClose();
    }
  };

  const handleSave = () => {
    if (!form) return;
    const updated: ToDoItem = { ...form, updatedAt: new Date().toISOString() };
    onEdit(updated);
    setIsEditing(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50" onClick={onClose}>
        {/* subtle white overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
      </div>

      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60 w-[720px] max-h-[80vh] overflow-hidden bg-white rounded-lg shadow-2xl p-6"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                className="w-full text-lg font-semibold text-gray-800 bg-transparent outline-none"
                value={form?.judul || ""}
                onChange={(e) => setForm((f) => f ? { ...f, judul: e.target.value } : f)}
              />
            ) : (
              <h3 className="text-lg font-semibold truncate">{item.judul}</h3>
            )}
            <div className="text-sm text-gray-500 mt-1">
              {isEditing ? (
                <select className="p-2 border rounded" value={form?.kategori || ""} onChange={(e) => setForm((f) => f ? { ...f, kategori: e.target.value } : f)}>
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
              ) : (
                <div>{item.kategori} • {item.prioritas}</div>
              )}
            </div>
          </div>
          <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-700">×</button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500">Created</div>
            <div className="mt-1 text-gray-700">{item.createdAt ? new Date(item.createdAt).toLocaleString() : '-'}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Updated</div>
            <div className="mt-1 text-gray-700">{item.updatedAt ? new Date(item.updatedAt).toLocaleString() : '-'}</div>
          </div>
        </div>

        {/* Description must be last and scrollable if long */}
        <div className="mt-4 max-h-[40vh] overflow-y-auto">
          <div className="text-xs text-gray-500 mb-2">Deskripsi</div>
          {isEditing ? (
            <textarea className="w-full p-2 border rounded mt-1 min-h-[140px]" value={form?.description || ""} onChange={(e) => setForm((f) => f ? { ...f, description: e.target.value } : f)} />
          ) : (
            <div className="text-gray-700 whitespace-pre-wrap">{item.description}</div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {isEditing ? (
            <>
              <button onClick={() => { setIsEditing(false); setForm(item ? { ...item } : null); }} className="px-4 py-2 border rounded">Batal</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Simpan</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 border rounded">Edit</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default ActivityModal;
