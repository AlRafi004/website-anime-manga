"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Tipe data untuk bookmark/history
interface BookmarkItem {
  id: number;
  title: string;
  url: string;
}

export default function BookmarkPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("bookmarks");
    if (data) setBookmarks(JSON.parse(data));
  }, []);

  function handleDelete(id: number) {
    const filtered = bookmarks.filter((item) => item.id !== id);
    setBookmarks(filtered);
    localStorage.setItem("bookmarks", JSON.stringify(filtered));
  }

  function handleClearAll() {
    setBookmarks([]);
    localStorage.removeItem("bookmarks");
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Bookmark / Favorit</h2>
      {bookmarks.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center text-gray-500">
          Belum ada anime/manga yang dibookmark.
        </div>
      ) : (
        <>
          <button
            onClick={handleClearAll}
            className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Hapus Semua
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bookmarks.map((item: BookmarkItem) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col gap-2"
              >
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <Link href={item.url} className="text-blue-500 hover:underline">
                  Lihat Detail
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition text-xs"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
