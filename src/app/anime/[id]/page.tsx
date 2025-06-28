"use client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { useEffect } from "react";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Tipe data untuk history/bookmark
interface HistoryItem {
  id: number;
  title: string;
  url: string;
}
interface JikanGenre {
  mal_id: number;
  name: string;
}


export default function AnimeDetailPage() {
  const params = useParams();
  const { id } = params;
  const { data, error, isLoading } = useSWR(
    id ? `https://api.jikan.moe/v4/anime/${id}` : null,
    fetcher
  );

  // Pastikan semua hook dipanggil sebelum return/exit
  // Bookmark & history hanya dijalankan jika data sudah ada
  useEffect(() => {
    if (!data?.data) return;
    const anime = data.data;
    // History handler
    const historyData = localStorage.getItem("watch_history");
    let history: HistoryItem[] = historyData ? JSON.parse(historyData) : [];
    if (!history.find((h: HistoryItem) => h.id === anime.mal_id)) {
      history.unshift({
        id: anime.mal_id,
        title: anime.title,
        url: `/anime/${anime.mal_id}`,
      });
      if (history.length > 50) history = history.slice(0, 50);
      localStorage.setItem("watch_history", JSON.stringify(history));
    }
  }, [data]);

  function handleBookmark() {
    if (!data?.data) return;
    const anime = data.data;
    const dataBookmark = localStorage.getItem("bookmarks");
    const bookmarks: HistoryItem[] = dataBookmark ? JSON.parse(dataBookmark) : [];
    if (!bookmarks.find((b: HistoryItem) => b.id === anime.mal_id)) {
      bookmarks.push({
        id: anime.mal_id,
        title: anime.title,
        url: `/anime/${anime.mal_id}`,
      });
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      alert("Ditambahkan ke bookmark!");
    } else {
      alert("Sudah ada di bookmark.");
    }
  }

  if (isLoading) return <div className="text-center p-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-8 text-red-500">Gagal memuat data.</div>
    );
  if (!data?.data)
    return <div className="text-center p-8">Anime tidak ditemukan.</div>;

  const anime = data.data;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-60 flex flex-col items-center">
          <div className="w-full rounded shadow overflow-hidden flex flex-col items-center justify-start bg-transparent dark:bg-transparent">
            <Image
              src={anime.images.jpg.image_url}
              alt={anime.title}
              width={240}
              height={320}
              className="w-full h-72 object-contain rounded-t"
              style={{ minHeight: "220px", maxHeight: "320px" }}
            />
          </div>
          {/* Badge info kecil di bawah sampul */}
          <div className="w-full flex flex-wrap gap-1 justify-center mt-1 mb-1">
            {anime.genres && anime.genres.length > 0 && (
              <span className="inline-block bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                Genre: {anime.genres.map((g: JikanGenre) => g.name).join(", ")}
              </span>
            )}
            {anime.rating && (
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                Rating: {anime.rating}
              </span>
            )}
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded text-[10px] font-semibold">
              Score: {anime.score ?? "-"}
            </span>
            {anime.episodes && (
              <span className="inline-block bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded text-[10px] font-semibold">
                Episodes: {anime.episodes}
              </span>
            )}
          </div>
          {/* Tombol bookmark ukuran normal di bawah badge info */}
          <button
            onClick={handleBookmark}
            className="mt-2 mb-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold shadow w-full"
          >
            Bookmark
          </button>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{anime.title}</h1>
          <p className="mb-2 text-gray-600 dark:text-gray-300 text-justify">
            {anime.synopsis}
          </p>
        </div>
      </div>
      {/* Cuplikan anime dari YouTube */}
      {anime.trailer?.embed_url && (
        <div className="mt-8 flex flex-col items-center">
          <h2 className="text-lg font-bold mb-4 text-blue-600 dark:text-blue-300">
            Cuplikan Anime
          </h2>
          <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg border border-blue-200 dark:border-blue-700 bg-black">
            <iframe
              src={
                anime.trailer.embed_url + "?autoplay=0&mute=1&rel=0&showinfo=0"
              }
              title={anime.title + " Trailer"}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      )}
      {/* Kolom Episode */}
      {anime.episodes > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-2 text-white">Daftar Episode</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Array.from({ length: anime.episodes }, (_, i) => (
              <a
                key={i + 1}
                href={`/anime/${anime.mal_id}/episode?ep=${i + 1}`}
                className="block text-center px-3 py-2 bg-blue-700/80 text-white rounded-lg text-sm font-semibold shadow hover:bg-blue-800 transition"
              >
                Episode {i + 1}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
