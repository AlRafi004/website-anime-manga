"use client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { useEffect } from "react";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());



export default function MangaDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data, error, isLoading } = useSWR(
    id ? `https://api.jikan.moe/v4/manga/${id}` : null,
    fetcher
  );

  // Pastikan manga sudah ada sebelum akses property
  const manga = data?.data;

  // Bookmark handler
  function handleBookmark() {
    if (!manga) return;
    const data = localStorage.getItem("bookmarks");
    const bookmarks: { id: number; title: string; url: string }[] = data
      ? JSON.parse(data)
      : [];
    if (!bookmarks.find((b) => b.id === manga.mal_id)) {
      bookmarks.push({
        id: manga.mal_id,
        title: manga.title,
        url: `/manga/${manga.mal_id}`,
      });
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      alert("Ditambahkan ke bookmark!");
    } else {
      alert("Sudah ada di bookmark.");
    }
  }

  // History handler
  useEffect(() => {
    if (!manga) return;
    const data = localStorage.getItem("watch_history");
    let history: { id: number; title: string; url: string }[] = data
      ? JSON.parse(data)
      : [];
    if (!history.find((h) => h.id === manga.mal_id)) {
      history.unshift({
        id: manga.mal_id,
        title: manga.title,
        url: `/manga/${manga.mal_id}`,
      });
      if (history.length > 50) history = history.slice(0, 50);
      localStorage.setItem("watch_history", JSON.stringify(history));
    }
  }, [manga]);

  if (isLoading) return <div className="text-center p-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-8 text-red-500">Gagal memuat data.</div>
    );
  if (!manga)
    return <div className="text-center p-8">Manga tidak ditemukan.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={manga.images.jpg.image_url}
          alt={manga.title}
          width={240}
          height={320}
          className="w-60 h-80 object-cover rounded shadow"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{manga.title}</h1>
          <p className="mb-2 text-gray-600 dark:text-gray-300">
            {manga.synopsis}
          </p>
          <div className="mb-2">
            Genre:{" "}
            {manga.genres
              .map((g: { mal_id: number; name: string }) => g.name)
              .join(", ")}
          </div>
          <div className="mb-2">Rating: {manga.rating}</div>
          <div className="mb-2">Score: {manga.score}</div>
          <div className="mb-2">Chapters: {manga.chapters}</div>
          <button
            onClick={handleBookmark}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Bookmark
          </button>
        </div>
      </div>
      {/* Kolom Chapter */}
      {manga.chapters > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-2 text-orange-600">
            Daftar Chapter
          </h2>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: manga.chapters }, (_, i) => (
              <a
                key={i + 1}
                href={`/manga/${manga.mal_id}/chapter?ch=${i + 1}`}
                className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold hover:bg-orange-200 transition"
              >
                Chapter {i + 1}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
