"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Tipe data untuk bookmark/history
interface HistoryItem {
  id: number;
  title: string;
  url: string;
}

export default function WatchHistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("watch_history");
    if (data) setHistory(JSON.parse(data));
  }, []);

  function handleDelete(id: number) {
    const filtered = history.filter((item) => item.id !== id);
    setHistory(filtered);
    localStorage.setItem("watch_history", JSON.stringify(filtered));
  }

  function handleClearAll() {
    setHistory([]);
    localStorage.removeItem("watch_history");
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-white dark:from-blue-900 dark:to-gray-900">
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Riwayat Tontonan</h2>
        {history.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center text-gray-500">
            Belum ada riwayat tontonan.
          </div>
        ) : (
          <>
            <button
              onClick={handleClearAll}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Hapus Semua
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {history.map((item: HistoryItem) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col gap-2"
                >
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <Link
                    href={item.url}
                    className="text-blue-500 hover:underline"
                  >
                    Lihat Detail
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition text-xs"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
