"use client";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Tipe data untuk anime, manga, dan genre
interface JikanAnime {
  mal_id: number;
  title: string;
  synopsis?: string;
  images: { jpg: { image_url: string; large_image_url?: string } };
  score?: number;
  genres?: { mal_id: number; name: string }[];
}
interface JikanManga {
  mal_id: number;
  title: string;
  synopsis?: string;
  images: { jpg: { image_url: string; large_image_url?: string } };
  score?: number;
}

function SearchPageContent() {
  const params = useSearchParams();
  const q = params.get("q") || "";
  const { data: animeData, isLoading: loadingAnime } = useSWR(
    q ? `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}` : null,
    fetcher
  );
  const { data: mangaData, isLoading: loadingManga } = useSWR(
    q ? `https://api.jikan.moe/v4/manga?q=${encodeURIComponent(q)}` : null,
    fetcher
  );

  const [carouselIndex, setCarouselIndex] = useState(0);
  // Auto-slide every 3.5 seconds
  useEffect(() => {
    if (!animeData?.data?.length) return;
    const interval = setInterval(() => {
      setCarouselIndex(
        (prev) => (prev + 1) % Math.min(5, animeData.data.length)
      );
    }, 3500);
    return () => clearInterval(interval);
  }, [animeData]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hasil Pencarian: &ldquo;{q}&rdquo;</h1>
      {/* Carousel Anime */}
      {animeData?.data?.length > 0 && (
        <div className="relative w-full h-60 md:h-72 mb-8 overflow-hidden rounded-xl shadow-lg bg-gray-100 dark:bg-gray-800">
          <div
            className="flex flex-row h-full transition-transform duration-700 w-full"
            style={{
              width: "100%",
              transform: `translateX(-${carouselIndex * 100}%)`,
            }}
          >
            {animeData.data
              .slice(0, 5)
              .map((anime: JikanAnime) => (
                <div
                  key={anime.mal_id}
                  className="w-full flex-shrink-0 h-60 md:h-72 flex items-center bg-cover bg-center relative cursor-pointer"
                  style={{
                    backgroundImage: `url(${
                      anime.images.jpg.large_image_url ||
                      anime.images.jpg.image_url
                    })`,
                  }}
                  onClick={() =>
                    setCarouselIndex(
                      (carouselIndex + 1) % Math.min(5, animeData.data.length)
                    )
                  }
                  title="Klik untuk geser ke anime berikutnya"
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 flex flex-col justify-center h-full pl-8 pr-4 max-w-xl">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow mb-2 tracking-tight line-clamp-2">
                      {anime.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {anime.genres?.map(
                        (genre: { mal_id: number; name: string }) => (
                          <span
                            key={genre.mal_id}
                            className="bg-blue-600/80 text-white text-xs font-semibold px-3 py-1 rounded-full shadow"
                          >
                            {genre.name}
                          </span>
                        )
                      )}
                    </div>
                    <p className="text-sm md:text-base text-blue-100 mb-4 max-w-xl line-clamp-3">
                      {anime.synopsis}
                    </p>
                    <span className="text-xs text-white/80 mb-2">
                      Score: {anime.score ?? "-"}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          {/* Carousel dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {animeData.data.slice(0, 5).map((_: JikanAnime, idx: number) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full border-2 ${
                  carouselIndex === idx
                    ? "bg-orange-500 border-orange-500"
                    : "bg-white/70 border-white/70"
                } transition`}
                onClick={() => setCarouselIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2 text-blue-700">Anime</h2>
        {loadingAnime && <p>Loading...</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {animeData?.data?.length > 0
            ? animeData.data.map((anime: JikanAnime) => (
                <Link
                  key={anime.mal_id}
                  href={`/anime/${anime.mal_id}`}
                  className="block bg-white dark:bg-gray-800 rounded shadow hover:scale-105 transition-transform overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-2">
                    <div className="font-bold text-sm line-clamp-2 mb-1 text-blue-700 dark:text-blue-300">
                      {anime.title}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Score: {anime.score ?? "-"}
                    </div>
                  </div>
                </Link>
              ))
            : !loadingAnime && (
                <div className="text-gray-500">Tidak ditemukan.</div>
              )}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2 text-blue-700">Manga</h2>
        {loadingManga && <p>Loading...</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {mangaData?.data?.length > 0
            ? mangaData.data.map((manga: JikanManga) => (
                <Link
                  key={manga.mal_id}
                  href={`/manga/${manga.mal_id}`}
                  className="block bg-white dark:bg-gray-800 rounded shadow hover:scale-105 transition-transform overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={manga.images.jpg.image_url}
                    alt={manga.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-2">
                    <div className="font-bold text-sm line-clamp-2 mb-1 text-blue-700 dark:text-blue-300">
                      {manga.title}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Score: {manga.score ?? "-"}
                    </div>
                  </div>
                </Link>
              ))
            : !loadingManga && (
                <div className="text-gray-500">Tidak ditemukan.</div>
              )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
