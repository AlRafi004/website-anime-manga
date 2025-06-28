"use client";
import useSWR from "swr";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const {
    data: animeData,
    error: animeError,
    isLoading: animeLoading,
  } = useSWR("https://api.jikan.moe/v4/top/anime", fetcher);
  const {
    data: mangaData,
    error: mangaError,
    isLoading: mangaLoading,
  } = useSWR("https://api.jikan.moe/v4/top/manga", fetcher);

  const [carouselIndex, setCarouselIndex] = useState(0);
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-blue-900 dark:to-gray-900 p-0">
      {/* Selamat Datang Section dengan background slider full page */}
      <section className="relative w-full mb-8 h-[320px] md:h-[420px] flex items-center justify-center overflow-hidden">
        {/* Background slider gambar anime full page */}
        {animeData?.data?.length > 0 && (
          <div className="absolute inset-0 z-0 flex items-center h-full w-full overflow-hidden">
            <div
              className="flex animate-slide-banner h-full w-full"
              style={{ minWidth: "200%" }}
            >
              {[
                ...animeData.data.slice(0, 5),
                ...animeData.data.slice(0, 5),
              ].map((anime: JikanAnime, idx: number) => (
                <Image
                  key={idx}
                  src={
                    anime.images.jpg.large_image_url ||
                    anime.images.jpg.image_url
                  }
                  alt={anime.title}
                  width={320}
                  height={400}
                  className="h-full w-[20vw] min-w-[320px] max-w-none opacity-40 blur-[1.5px] mx-0.5 object-cover select-none pointer-events-none"
                  draggable="false"
                  style={{
                    objectPosition: "center",
                    background: "transparent",
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div className="relative z-10 w-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-blue-200 drop-shadow mb-4 tracking-tight">
              Selamat Datang di JaksonAnimeManga
            </h1>
            <p className="text-lg md:text-xl text-blue-800 dark:text-blue-100 mb-6 max-w-2xl mx-auto">
              Streaming & info anime dan manga terlengkap, update setiap hari.
              Temukan anime favoritmu, bookmark, dan nikmati pengalaman seperti
              Crunchyroll dengan nuansa biru!
            </p>
          </div>
        </div>
      </section>

      {/* Top Anime ala katalog Crunchyroll */}
      <section className="max-w-6xl mx-auto px-4 mb-12 relative">
        <h2 className="text-2xl font-extrabold mb-6 text-blue-700 dark:text-blue-300 tracking-tight text-center drop-shadow">
          Top Anime
        </h2>
        {animeLoading && <p className="text-center">Loading...</p>}
        {animeError && (
          <p className="text-center text-red-500">Failed to load data.</p>
        )}
        <div className="relative">
          <button
            type="button"
            aria-label="Scroll kiri"
            className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700 transition"
            onClick={() => {
              const container = document.getElementById("top-anime-scroll");
              if (container)
                container.scrollBy({ left: -300, behavior: "smooth" });
            }}
          >
            ◀
          </button>
          <div
            id="top-anime-scroll"
            className="flex gap-6 overflow-x-auto pb-2 hide-scrollbar scroll-smooth scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100 dark:scrollbar-thumb-blue-700 dark:scrollbar-track-blue-900"
          >
            {animeData?.data?.map((anime: JikanAnime) => (
              <div
                key={anime.mal_id}
                className="min-w-[200px] max-w-[220px] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-[1.03] border border-blue-100 dark:border-blue-800 transition-transform flex flex-col"
              >
                <Link href={`/anime/${anime.mal_id}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className="w-full h-64 object-contain cursor-pointer hover:brightness-95 transition bg-transparent"
                    style={{ background: "transparent" }}
                  />
                </Link>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h3 className="text-base font-bold mb-1 text-blue-700 dark:text-blue-300 line-clamp-2">
                    {anime.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                    Score: {anime.score ?? "-"}
                  </p>
                  <Link
                    href={`/anime/${anime.mal_id}`}
                    className="text-blue-500 hover:underline text-xs font-semibold"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            aria-label="Scroll kanan"
            className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700 transition"
            onClick={() => {
              const container = document.getElementById("top-anime-scroll");
              if (container)
                container.scrollBy({ left: 300, behavior: "smooth" });
            }}
          >
            ▶
          </button>
        </div>
      </section>

      {/* Banner Featured Anime ala Crunchyroll */}
      {animeData?.data && animeData.data.length > 0 && (
        <section className="relative w-full h-[420px] md:h-[520px] flex items-center justify-start shadow-lg mb-12 overflow-hidden rounded-xl max-w-6xl mx-auto">
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
                  className="w-full flex-shrink-0 h-[420px] md:h-[520px] flex items-center bg-cover bg-center relative cursor-pointer"
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
                  <div className="relative z-10 flex flex-col justify-center h-full pl-8 pr-4 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow mb-2 tracking-tight">
                      {anime.title}
                    </h1>
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
                    <p className="text-base md:text-lg text-blue-100 mb-6 max-w-xl line-clamp-4">
                      {anime.synopsis}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href={`/anime/${anime.mal_id}`}
                        className="bg-blue-600 text-white font-bold px-6 py-2 rounded-full shadow hover:bg-blue-700 transition flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0v10.5A2.25 2.25 0 0113.5 21h-3a2.25 2.25 0 01-2.25-2.25V9m7.5 0H6.75"
                          />
                        </svg>
                        Mulai Nonton
                      </Link>
                      <Link
                        href={`/anime/${anime.mal_id}`}
                        className="border-2 border-white text-white font-bold px-6 py-2 rounded-full shadow hover:bg-white hover:text-blue-700 transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Detail Anime
                      </Link>
                    </div>
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
        </section>
      )}

      {/* Top Manga ala katalog Crunchyroll */}
      <section className="max-w-6xl mx-auto px-4 mb-12 relative">
        <h2 className="text-2xl font-extrabold mb-6 text-blue-700 dark:text-blue-300 tracking-tight text-center drop-shadow">
          Top Manga
        </h2>
        {mangaLoading && <p className="text-center">Loading...</p>}
        {mangaError && (
          <p className="text-center text-red-500">Failed to load data.</p>
        )}
        <div className="relative">
          <button
            type="button"
            aria-label="Scroll kiri"
            className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700 transition"
            onClick={() => {
              const container = document.getElementById("top-manga-scroll");
              if (container)
                container.scrollBy({ left: -300, behavior: "smooth" });
            }}
          >
            ◀
          </button>
          <div
            id="top-manga-scroll"
            className="flex gap-6 overflow-x-auto pb-2 hide-scrollbar scroll-smooth scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100 dark:scrollbar-thumb-blue-700 dark:scrollbar-track-blue-900"
          >
            {mangaData?.data?.map((manga: JikanManga) => (
              <div
                key={manga.mal_id}
                className="min-w-[200px] max-w-[220px] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-[1.03] border border-blue-100 dark:border-blue-800 transition-transform flex flex-col"
              >
                <Link href={`/manga/${manga.mal_id}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={manga.images.jpg.image_url}
                    alt={manga.title}
                    className="w-full h-64 object-contain cursor-pointer hover:brightness-95 transition bg-transparent"
                    style={{ background: "transparent" }}
                  />
                </Link>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h3 className="text-base font-bold mb-1 text-blue-700 dark:text-blue-300 line-clamp-2">
                    {manga.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                    Score: {manga.score ?? "-"}
                  </p>
                  <Link
                    href={`/manga/${manga.mal_id}`}
                    className="text-blue-500 hover:underline text-xs font-semibold"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            aria-label="Scroll kanan"
            className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700 transition"
            onClick={() => {
              const container = document.getElementById("top-manga-scroll");
              if (container)
                container.scrollBy({ left: 300, behavior: "smooth" });
            }}
          >
            ▶
          </button>
        </div>
      </section>
    </main>
  );
}

// Tipe data dari Jikan API (sederhana)
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

// Animasi slider banner
import "./slider-banner.css";

// Hide scrollbar utility
import "./hide-scrollbar.css";
