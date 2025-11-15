export interface StreakEntry {
  id: number;
  title: string;
  category?: string;
  subcategory?: string;
  totalMinutes: number; // total duration in minutes
  lastUpdated?: string; // ISO string
  description?: string;
  date?: string; // ISO date when completed
  status?: string;
  days?: string[];
  breakTime?: string;
}

export interface WeeklyStreakEntry {
  day: string; // e.g., 'Senin'
  totalMinutes: number;
}

export type TimerState = {
  running: boolean;
  seconds: number;
};
