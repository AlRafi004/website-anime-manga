"use client";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Tipe data genre dari Jikan API
interface JikanGenre {
  mal_id: number;
  name: string;
  count?: number;
}

export default function GenresPage() {
  const { data, error, isLoading } = useSWR(
    "https://api.jikan.moe/v4/genres/anime",
    fetcher
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-white dark:from-blue-900 dark:to-gray-900">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Daftar Genre Anime</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Gagal memuat data genre.</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data?.data?.map((genre: JikanGenre) => (
            <Link
              key={genre.mal_id}
              href={`/anime?genre=${genre.mal_id}`}
              className="block bg-white dark:bg-gray-800 rounded shadow p-4 text-center hover:bg-blue-50 dark:hover:bg-blue-900 transition"
            >
              <div className="font-semibold text-blue-600 dark:text-blue-300">
                {genre.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {genre.count} anime
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
