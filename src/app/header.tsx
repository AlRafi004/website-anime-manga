"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(search)}`;
    }
  }

  return (
    <header className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 shadow-lg sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center px-4 py-3">
        <div className="flex-none mr-auto">
          <Link
            href="/"
            className="font-extrabold text-2xl md:text-3xl text-white tracking-tight drop-shadow hover:underline"
          >
            JaksonAnimeManga
          </Link>
        </div>
        <div className="flex gap-4 ml-auto text-white font-semibold text-sm md:text-base items-center">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/anime" className="hover:underline">
            Anime
          </Link>
          <Link href="/manga" className="hover:underline">
            Manga
          </Link>
          <Link href="/genres" className="hover:underline">
            Genre
          </Link>
          <Link href="/user/history" className="hover:underline">
            History
          </Link>
          <Link
            href="/user/bookmark"
            className="hover:text-yellow-300 text-xl"
            title="Bookmark"
          >
            <span role="img" aria-label="bookmark">
              🔖
            </span>
          </Link>
          <Link
            href="/auth"
            className="hover:text-blue-200 text-xl"
            title="Akun"
          >
            <span role="img" aria-label="akun">
              👤
            </span>
          </Link>
          <button
            className="ml-2 text-lg hover:text-blue-200 focus:outline-none"
            onClick={() => setShowSearch((v) => !v)}
            title="Cari Anime/Manga"
          >
            <span role="img" aria-label="search">
              🔍
            </span>
          </button>
        </div>
      </nav>
      {showSearch && (
        <form
          onSubmit={handleSearch}
          className="max-w-6xl mx-auto px-4 pb-3 flex justify-end"
        >
          <input
            type="text"
            className="w-64 px-3 py-2 rounded-l bg-white text-gray-800 focus:outline-none"
            placeholder="Cari anime atau manga..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-r bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
          >
            Cari
          </button>
        </form>
      )}
    </header>
  );
}
