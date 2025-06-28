"use client";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Tipe data manga dari Jikan API
interface JikanManga {
  mal_id: number;
  title: string;
  synopsis?: string;
  images: { jpg: { image_url: string; large_image_url?: string } };
  score?: number;
}

export default function MangaListPage() {
  const { data, error, isLoading } = useSWR(
    "https://api.jikan.moe/v4/top/manga",
    fetcher
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Manga Populer</h1>
      {isLoading && <p className="text-center">Loading...</p>}
      {error && (
        <p className="text-center text-red-500">Gagal memuat data manga.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data?.map((manga: JikanManga) => (
          <div
            key={manga.mal_id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={manga.images.jpg.image_url}
              alt={manga.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                {manga.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Score: {manga.score ?? "-"}
              </p>
              <Link
                href={`/manga/${manga.mal_id}`}
                className="text-blue-500 hover:underline"
              >
                Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
