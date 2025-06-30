"use client";
import Link from "next/link";
import { useState } from "react";
import { FaSearch, FaBookmark, FaUser } from "react-icons/fa";

export default function Header() {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(search)}`;
    }
  }

  return (
    <header className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 shadow-lg sticky top-0 z-50">
      <nav className="w-full flex items-center px-4 md:px-8 py-3 relative">
        <div className="flex-none">
          <Link
            href="/"
            className="font-extrabold text-2xl md:text-3xl text-white tracking-tight drop-shadow hover:underline ml-0"
          >
            JaksonAnimeManga
          </Link>
        </div>
        <div className="flex-1 flex md:hidden justify-end items-center gap-2">
          {/* Search icon: left of hamburger on mobile */}
          <button
            className="text-lg text-white hover:text-blue-200 focus:outline-none"
            onClick={() => setShowSearch((v) => !v)}
            title="Cari Anime/Manga"
          >
            <FaSearch className="w-6 h-6 text-white" />
          </button>
          {/* Hamburger button for mobile */}
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
        {/* Desktop & mobile menu */}
        <div
          className={`gap-4 ml-auto text-white font-semibold text-sm md:text-base items-center md:flex ${
            menuOpen
              ? "flex flex-col absolute top-full left-0 w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 p-4 z-50"
              : "hidden"
          } md:static md:bg-transparent md:p-0 md:flex-row`}
        >
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
          {/* Search icon in menu on desktop only */}
          <button
            className="hidden md:inline ml-2 text-lg hover:text-blue-200 focus:outline-none"
            onClick={() => setShowSearch((v) => !v)}
            title="Cari Anime/Manga"
          >
            <FaSearch className="w-6 h-6 text-white" />
          </button>
          {/* Only show these as icon on desktop, as text on mobile menu */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/user/bookmark"
              className="hover:text-yellow-300 text-xl"
              title="Bookmark"
            >
              <FaBookmark className="w-6 h-6 text-white" />
            </Link>
            <Link
              href="/auth"
              className="hover:text-blue-200 text-xl"
              title="Akun"
            >
              <FaUser className="w-6 h-6 text-white" />
            </Link>
          </div>
          {/* Show as text in mobile menu */}
          <div className="flex flex-col w-full md:hidden mt-2 gap-2">
            <Link
              href="/user/bookmark"
              className="hover:text-yellow-300 py-2 px-2 rounded bg-blue-800/40"
            >
              Bookmark
            </Link>
            <Link
              href="/auth"
              className="hover:text-blue-200 py-2 px-2 rounded bg-blue-800/40"
            >
              Akun
            </Link>
          </div>
        </div>
      </nav>
      {showSearch && (
        <div className="relative w-full">
          <form
            onSubmit={handleSearch}
            className="absolute right-8 md:right-12 top-0 mt-2 z-50 flex justify-end"
            style={{ minWidth: 0 }}
          >
            <input
              type="text"
              className="w-64 md:w-80 px-3 py-2 rounded-l bg-white text-gray-800 focus:outline-none shadow"
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
        </div>
      )}
    </header>
  );
}
