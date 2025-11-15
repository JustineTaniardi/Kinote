"use client";

import React from "react";
import ActivityDetailSidebar from "./ActivityDetailSidebar";
import { StreakEntry } from "./StreakTypes";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  entry: StreakEntry | null;
  onDelete?: (id: number) => void;
  onEdit?: (updated: StreakEntry) => void;
}

export default function StreakDetailSidebar({ isOpen, onClose, entry, onDelete, onEdit }: Props) {
  // Reuse ActivityDetailSidebar which follows the requested design
  if (!entry) return null;
  // Map StreakEntry -> ActivityItem shape expected by ActivityDetailSidebar
  const mapped = {
    id: entry.id,
    status: entry.status ?? 'Belum Dimulai',
    judul: entry.title,
    kategori: entry.category ?? '',
    subcategory: entry.subcategory ?? undefined,
    days: [],
    totalTime: String(entry.totalMinutes),
    repeatCount: undefined,
    breakTime: undefined,
    deadline: entry.date ?? undefined,
    description: entry.description ?? undefined,
    createdAt: entry.lastUpdated ?? undefined,
    updatedAt: entry.lastUpdated ?? undefined,
  } as any;

  return (
    <ActivityDetailSidebar
      isOpen={isOpen}
      onClose={onClose}
      item={mapped}
      onDelete={(id) => onDelete && onDelete(id)}
      onEdit={(updated) => onEdit && onEdit({ ...entry, title: updated.judul, description: updated.description, lastUpdated: updated.updatedAt })}
    />
  );
}
