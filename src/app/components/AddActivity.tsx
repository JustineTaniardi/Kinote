"use client";

import React, { useEffect, useState } from "react";
import SidebarWrapper from "./SidebarWrapper";
import { CATEGORIES, SUBCATEGORIES } from "./ActivityCategories";

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

  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [hari, setHari] = useState("");
  const [repeat, setRepeat] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [breakTime, setBreakTime] = useState("");
  const [description, setDescription] = useState("");

  // Get subcategories for selected category
  const availableSubcategories = category ? SUBCATEGORIES[category as keyof typeof SUBCATEGORIES] || [] : [];

  // Reset subcategory when category changes
  useEffect(() => {
    setSubcategory("");
  }, [category]);

  const clearAll = () => {
    setTitle("");
    setCategory("");
    setSubcategory("");
    setHari("");
    setRepeat("");
    setTotalTime("");
    setBreakTime("");
    setDescription("");
  };

  const handleSave = () => {
    const payload = {
      title: title || "Untitled",
      category,
      subcategory,
      hari: parseInt(hari) || 0,
      repeat: parseInt(repeat) || 0,
      totalTime: parseInt(totalTime) || 0,
      breakTime: parseInt(breakTime) || 0,
      description,
      status: "Belum Dimulai",
      createdAt: Date.now(),
    };
    if (onSave) onSave(payload);
    clearAll();
    onClose();
  };

  if (!mounted) return null;

  return (
    <SidebarWrapper isOpen={isOpen} onClose={() => { clearAll(); onClose(); }} width="400px">
      {/* Header with Editable Title */}
      <div className="px-6 py-6 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Editable Title Input in Header */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Activity Name"
              className="w-full text-lg font-semibold text-gray-900 bg-transparent border-none outline-none placeholder-gray-400 truncate p-0"
            />
            <div className="text-sm text-gray-500 mt-1">Create a new activity</div>
          </div>
          <button 
            onClick={() => { clearAll(); onClose(); }} 
            className="text-gray-600 hover:text-gray-900 text-2xl leading-none transition shrink-0"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="px-6 py-6 flex-1 space-y-5 overflow-y-auto">
        {/* Category Dropdown */}
        <div>
          <label className="text-sm font-medium text-gray-900 mb-2 block">Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition bg-white"
          >
            <option value="">Select Category</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Sub Category Dropdown */}
        <div>
          <label className="text-sm font-medium text-gray-900 mb-2 block">Sub Category</label>
          <select 
            value={subcategory} 
            onChange={(e) => setSubcategory(e.target.value)} 
            disabled={!category}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition bg-white disabled:bg-gray-50 disabled:text-gray-500"
          >
            <option value="">Select Sub Category</option>
            {availableSubcategories.map(subcat => (
              <option key={subcat} value={subcat}>{subcat}</option>
            ))}
          </select>
        </div>

        {/* Hari (Days) Input */}
        <div>
          <label className="text-sm font-medium text-gray-900 mb-2 block">Hari (Days)</label>
          <input 
            type="number"
            min="0"
            value={hari} 
            onChange={(e) => setHari(e.target.value)} 
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            placeholder="0"
          />
        </div>

        {/* Repeat Input */}
        <div>
          <label className="text-sm font-medium text-gray-900 mb-2 block">Repeat</label>
          <input 
            type="number"
            min="0"
            value={repeat} 
            onChange={(e) => setRepeat(e.target.value)} 
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            placeholder="0"
          />
        </div>

        {/* Total Time Input */}
        <div>
          <label className="text-sm font-medium text-gray-900 mb-2 block">Total Time (minutes)</label>
          <input 
            type="number"
            min="0"
            value={totalTime} 
            onChange={(e) => setTotalTime(e.target.value)} 
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            placeholder="0"
          />
        </div>

        {/* Break Time Input */}
        <div>
          <label className="text-sm font-medium text-gray-900 mb-2 block">Break (minutes)</label>
          <input 
            type="number"
            min="0"
            value={breakTime} 
            onChange={(e) => setBreakTime(e.target.value)} 
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            placeholder="0"
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label className="text-sm font-medium text-gray-900 mb-2 block">Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition resize-none"
            placeholder="Add a description..."
            rows={4}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 border-t border-gray-200 flex gap-3 sticky bottom-0 bg-white">
        <button 
          onClick={() => { clearAll(); onClose(); }} 
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button 
          onClick={handleSave} 
          className="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
        >
          Save
        </button>
      </div>
    </SidebarWrapper>
  );
}
