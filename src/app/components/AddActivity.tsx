"use client";

import React, { useEffect, useState } from "react";
import SidebarWrapper from "./SidebarWrapper";

interface AddActivityProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (payload: any) => void;
}

export default function AddActivity({ isOpen, onClose, onSave }: AddActivityProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) setMounted(true);
    else {
      const t = setTimeout(() => setMounted(false), 260);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [dayCount, setDayCount] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [totalTime, setTotalTime] = useState("");
  const [repeatCount, setRepeatCount] = useState("");
  const [breakTime, setBreakTime] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const categories = ["Akademik", "Pekerjaan", "Olahraga", "Kesehatan", "Keterampilan", "Hobi"];
  const subcategories = ["Sub A", "Sub B", "Sub C"];
  const dayOptions = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  const toggleDay = (d: string) => setDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);

  const clearAll = () => {
    setTitle(""); setCategory(""); setSubcategory(""); setDays([]);
    setTotalTime(""); setRepeatCount(""); setBreakTime(""); setDescription(""); setDate(""); setCategoryError(null);
  };

  const handleSave = () => {
    if (!category) { setCategoryError("Pilih kategori terlebih dahulu"); return; }
    const payload = { title, category, subcategory, days, totalTime, repeatCount, breakTime, description, date, status: "Belum Dimulai", createdAt: Date.now() };
    if (onSave) onSave(payload);
    else console.log("AddActivity payload:", payload);
    clearAll();
    onClose();
  };

  if (!mounted) return null;

  return (
    <SidebarWrapper isOpen={isOpen} onClose={() => { clearAll(); onClose(); }} width="400px">
      <div className="px-6 py-6 border-b border-gray-200 flex items-start justify-between">
        <div>
          <div className="text-lg font-semibold text-gray-900">{title || "Belajar Koding"}</div>
          <div className="text-sm text-gray-500 mt-1">Tambah Aktivitas</div>
        </div>
        <button onClick={() => { clearAll(); onClose(); }} className="text-gray-800 text-3xl leading-none">✕</button>
      </div>

      <div className="px-6 py-4 flex-1 space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Judul</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="Masukkan Judul" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium mb-2 block">Kategori</label>
            <div className="border rounded-lg px-3 py-2">
              <select value={category} onChange={(e) => { setCategory(e.target.value); setCategoryError(null); }} className="w-full bg-transparent outline-none text-sm">
                <option value="">Pilih kategori...</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Sub Category</label>
            <div className="border rounded-lg px-3 py-2">
              <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="w-full bg-transparent outline-none text-sm">
                <option value="">Pilih Subkategori...</option>
                {subcategories.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm font-medium mb-2 block">Day (angka)</label>
            <input type="number" min={0} value={dayCount} onChange={(e) => setDayCount(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="Jumlah hari" />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Hari</label>
            <div className="border rounded-lg p-2 grid grid-cols-3 gap-2">
              {dayOptions.map(d => (
                <button key={d} type="button" onClick={() => toggleDay(d)} className={`px-2 py-1 text-sm rounded ${days.includes(d) ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-700'}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Tanggal</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>

      </div>

      <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
        <button onClick={() => { clearAll(); onClose(); }} className="flex-1 px-4 py-2.5 border rounded-lg text-sm">Batal</button>
        <button onClick={handleSave} className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm">Simpan</button>
      </div>
    </SidebarWrapper>
  );
}
