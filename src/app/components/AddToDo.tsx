"use client";

import React, { useEffect, useState } from "react";
import SidebarWrapper from "./SidebarWrapper";

interface AddToDoProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ToDoFormData) => void;
}

export interface ToDoFormData {
  judul: string;
  kategori: string;
  prioritas: string;
  tanggal: string;
  deskripsi: string;
  status?: string;
}

const AddToDo: React.FC<AddToDoProps> = ({ isOpen, onClose, onSubmit }) => {
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState<ToDoFormData>({ judul: "", kategori: "", prioritas: "Medium", tanggal: "", deskripsi: "" });
  const [categoryError, setCategoryError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) { setMounted(true); document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = "unset"; }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleClose = () => { setMounted(false); setTimeout(() => onClose(), 240); };

  const handleSubmit = () => {
    if (!formData.kategori) { setCategoryError("Pilih kategori terlebih dahulu"); return; }
    const payload = { ...formData, status: formData.deskripsi ? formData.status ?? 'Belum Dimulai' : 'Belum Dimulai' };
    if (onSubmit) onSubmit(payload);
    handleClose();
  };

  const handleInputChange = (field: keyof ToDoFormData, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  const priorityOptions = ["Rendah", "Medium", "Tinggi"];
  const categories = ["Kerja","Belajar","Personal","Kesehatan","Kebersihan / Rumah","Proyek","Hiburan","Olahraga","Kreativitas","Finance / Keuangan"];

  if (!mounted) return null;

  return (
    <SidebarWrapper isOpen={isOpen} onClose={handleClose} width="400px">
      <div className="px-6 py-6 border-b border-gray-200 flex items-start justify-between">
        <div>
          <div className="text-lg font-semibold text-gray-900">{formData.judul || 'Tambah ToDo'}</div>
          <div className="text-sm text-gray-500 mt-1">Tambahkan ToDo</div>
        </div>
        <button onClick={handleClose} className="text-gray-800 text-3xl leading-none">✕</button>
      </div>

      <div className="px-6 py-4 flex-1 space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Judul</label>
          <input value={formData.judul} onChange={(e) => handleInputChange('judul', e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="Masukkan Judul" />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Tanggal</label>
          <input type="date" value={formData.tanggal} onChange={(e) => handleInputChange('tanggal', e.target.value)} className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Kategori</label>
          <div className="border rounded-lg px-3 py-2">
            <select value={formData.kategori} onChange={(e) => { setCategoryError(null); handleInputChange('kategori', e.target.value); }} className="w-full bg-transparent outline-none text-sm">
              <option value="">Pilih kategori...</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {categoryError && <div className="text-sm text-red-600 mt-1">{categoryError}</div>}
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Prioritas</label>
          <div className="border rounded-lg px-3 py-2">
            <select value={formData.prioritas} onChange={(e) => handleInputChange('prioritas', e.target.value)} className="w-full bg-transparent outline-none text-sm">
              {priorityOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Deskripsi</label>
          <textarea value={formData.deskripsi} onChange={(e) => handleInputChange('deskripsi', e.target.value)} className="w-full border rounded-lg p-3 h-36 resize-none" placeholder="Masukkan deskripsi..." />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Status</label>
          <div className="bg-gray-50 border rounded-lg p-3 text-gray-700">Belum Dimulai</div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
        <button onClick={handleClose} className="flex-1 px-4 py-2.5 border rounded-lg text-sm">Batal</button>
        <button onClick={handleSubmit} className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm">Simpan</button>
      </div>
    </SidebarWrapper>
  );
};

export default AddToDo;