"use client";

import React from "react";
import ActivityItem from "./ActivityItem";
import { StreakEntry } from "./StreakTypes";

interface Props {
  day: string;
  activities: StreakEntry[];
  onOpen: (entry: StreakEntry) => void;
  onStart: (entry: StreakEntry) => void;
}

export default function StreakWeeklyColumn({ day, activities, onOpen, onStart }: Props) {
  return (
    <div className="flex flex-col" style={{ minWidth: "160px", flexShrink: 0 }}>
      {/* Day Header */}
      <div className="text-center mb-4 pb-2 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">{day}</h3>
        <p className="text-xs text-gray-500 mt-1">{activities.length} activity</p>
      </div>

      {/* Activities Column - scrollable vertically if needed */}
      <div className="flex flex-col gap-4">
        {activities.length > 0 ? (
          activities.map((entry) => (
            <div
              key={entry.id}
              style={{ width: "160px", aspectRatio: "1 / 1" }}
            >
              <ActivityItem
                entry={entry}
                onOpen={onOpen}
                onStart={onStart}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400 text-xs">No activities</div>
        )}
      </div>
    </div>
  );
}
