import React from "react";

export default function StreakContent() {
  return (
    <div className="flex-1 bg-[#FFFFFF] p-8">
      {/* Search Bar */}
      <div className="w-full bg-[#F4F6F9] rounded-xl px-6 py-3 shadow-sm mb-6 flex items-center">
        <input
          type="text"
          placeholder="Search for anything.."
          className="w-full bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
        />
      </div>

      {/* Table */}
      <div className="bg-[#F4F6F9] rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-gray-700">
          <thead className="border-b border-gray-200">
            <tr className="text-left">
              <th className="px-6 py-3 font-semibold">Judul</th>
              <th className="px-6 py-3 font-semibold">Hari Pengerjaan</th>
              <th className="px-6 py-3 font-semibold">Durasi</th>
              <th className="px-6 py-3 font-semibold">Waktu Istirahat</th>
              <th className="px-6 py-3 font-semibold">Streak</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Belajar Koding", "Sabtu, Minggu", "30 Menit", "10 Menit", 6],
              ["Belajar Gitar", "Kamis-Minggu", "30 Menit", "10 Menit", 6],
              ["Latihan Bulu Tangkis", "Sabtu", "30 Menit", "10 Menit", 6],
            ].map(([judul, hari, durasi, istirahat, streak], index) => (
              <tr
                key={index}
                className="bg-white border-b border-gray-200 shadow-sm"
              >
                <td className="px-6 py-3 flex items-center gap-3">
                  <span className="text-gray-400">⋮⋮</span>
                  {judul}
                </td>
                <td className="px-6 py-3">{hari}</td>
                <td className="px-6 py-3">{durasi}</td>
                <td className="px-6 py-3">{istirahat}</td>
                <td className="px-6 py-3 flex items-center gap-2">
                  <img
                    src="/img/sidebar/streak_icon.png"
                    alt="streak"
                    className="w-5 h-6"
                  />
                  {streak}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Input */}
      <div className="bg-[#F4F6F9] mt-8 rounded-xl px-6 py-3 shadow-sm flex items-center gap-2 text-sm text-gray-600 italic">
        <span className="text-lg font-semibold">+</span>
        Coba Ketik <span className="italic text-gray-500">“Belajar Masak”</span>
      </div>
    </div>
  );
}
