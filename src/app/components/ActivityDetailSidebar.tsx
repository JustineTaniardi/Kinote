"use client";

import React, { useEffect, useState } from "react";
import SidebarWrapper from "./SidebarWrapper";

interface ActivityItem {
  id: number;
  status: string;
  judul: string;
  kategori?: string;
  subcategory?: string;
  days?: string[];
  totalTime?: string;
  repeatCount?: string;
  breakTime?: string;
  deadline?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  item: ActivityItem | null;
  onDelete?: (id: number) => void;
  onEdit?: (updated: ActivityItem) => void;
}

export default function ActivityDetailSidebar({ isOpen, onClose, item, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<ActivityItem | null>(null);

  useEffect(() => {
    setIsEditing(false);
    setForm(item ? { ...item } : null);
  }, [item]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleDelete = () => {
    if (!item) return;
    if (confirm("Hapus aktivitas ini?")) {
      onDelete && onDelete(item.id);
      onClose();
    }
  };

  const handleSave = () => {
    if (!form) return;
    const updated: ActivityItem = { ...form, updatedAt: new Date().toISOString() };
    onEdit && onEdit(updated);
    setIsEditing(false);
  };

  return (
    <SidebarWrapper isOpen={isOpen} onClose={onClose} width="400px">
      <div className="px-6 py-6 border-b border-gray-200 flex items-start justify-between">
        <div>
          {isEditing ? (
            <input className="text-lg font-semibold outline-none" value={form?.judul || ""} onChange={(e) => setForm(f => f ? { ...f, judul: e.target.value } : f)} />
          ) : (
            <div className="text-lg font-semibold text-gray-900">{item.judul}</div>
          )}
          <div className="text-sm text-gray-500 mt-1">{item.kategori} {item.subcategory ? `| ${item.subcategory}` : ''}</div>
        </div>
        <button onClick={onClose} className="text-gray-800 text-3xl leading-none">✕</button>
      </div>

      <div className="px-6 py-4 flex-1 space-y-4">
        <div>
          <div className="text-sm text-gray-500">Hari</div>
          <div className="bg-gray-50 border rounded-lg p-3 text-gray-700">{item.days && item.days.length ? item.days.join(', ') : '-'}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Repeat</div>
          <div className="bg-gray-50 border rounded-lg p-3 text-gray-700">{item.repeatCount ? `${item.repeatCount} kali` : '-'}</div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="text-sm text-gray-500">Total Time</div>
            <div className="bg-gray-50 border rounded-lg p-3 text-gray-700">{item.totalTime ? `${item.totalTime} menit` : '-'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Break</div>
            <div className="bg-gray-50 border rounded-lg p-3 text-gray-700">{item.breakTime ? `${item.breakTime} menit` : '-'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Tanggal</div>
            <div className="bg-gray-50 border rounded-lg p-3 text-gray-700">{item.deadline || '-'}</div>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Status</div>
          <div className="bg-gray-50 border rounded-lg p-3 text-gray-700">{item.status}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500 mb-2">Deskripsi</div>
          {isEditing ? (
            <textarea className="w-full p-3 border rounded min-h-[140px]" value={form?.description || ""} onChange={(e) => setForm(f => f ? { ...f, description: e.target.value } : f)} />
          ) : (
            <div className="text-gray-700 whitespace-pre-wrap">{item.description}</div>
          )}
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
        {isEditing ? (
          <>
            <button onClick={() => { setIsEditing(false); setForm(item ? { ...item } : null); }} className="flex-1 px-4 py-2.5 border rounded-lg">Batal</button>
            <button onClick={handleSave} className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg">Simpan</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="flex-1 px-4 py-2.5 border rounded-lg">Edit</button>
            <button onClick={handleDelete} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg">Delete</button>
          </>
        )}
      </div>
    </SidebarWrapper>
  );
}
