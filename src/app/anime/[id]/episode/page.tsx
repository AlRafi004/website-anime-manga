"use client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Tipe data episode dan anime Jikan
interface JikanEpisode {
  mal_id: number;
  title: string;
  aired?: string;
  synopsis?: string;
  url?: string;
  images?: { jpg: { image_url: string } };
}


export default function EpisodeListPage() {
  const params = useParams();
  const { id } = params;
  // Fetch episode list
  const { data, error, isLoading } = useSWR(
    id ? `https://api.jikan.moe/v4/anime/${id}/episodes` : null,
    fetcher
  );
  // Fetch anime detail
  const { data: animeDetail } = useSWR(
    id ? `https://api.jikan.moe/v4/anime/${id}` : null,
    fetcher
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-extrabold mb-4 text-blue-600 dark:text-blue-300 tracking-tight text-center drop-shadow">
        Daftar Episode
      </h2>
      {/* Badge info lengkap anime */}
      {animeDetail?.data && (
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {animeDetail.data.genres && animeDetail.data.genres.length > 0 && (
            <span className="inline-block bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded text-xs font-semibold">
              Genre:{" "}
              {animeDetail.data.genres
                .map((g: { mal_id: number; name: string }) => g.name)
                .join(", ")}
            </span>
          )}
          {animeDetail.data.rating && (
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-semibold">
              Rating: {animeDetail.data.rating}
            </span>
          )}
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-semibold">
            Score: {animeDetail.data.score ?? "-"}
          </span>
          {animeDetail.data.episodes && (
            <span className="inline-block bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-semibold">
              Episodes: {animeDetail.data.episodes}
            </span>
          )}
        </div>
      )}
      {isLoading && <div className="text-center">Loading...</div>}
      {error && (
        <div className="text-center text-red-500">Gagal memuat episode.</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.data?.length > 0 ? (
          data.data.map((ep: JikanEpisode) => (
            <div
              key={ep.mal_id}
              className="bg-gradient-to-br from-blue-100 to-white dark:from-blue-900 dark:to-gray-900 rounded-xl shadow-lg flex flex-col h-full border border-blue-200 dark:border-blue-700 hover:scale-[1.02] transition-transform"
            >
              {ep.images?.jpg?.image_url && (
                <div
                  className="w-full flex justify-center items-center bg-white dark:bg-gray-900 rounded-t-xl overflow-hidden group"
                  style={{ height: "180px" }}
                >
                  <Link href={`/anime/${id}`} passHref legacyBehavior>
                    <a
                      className="w-full h-full flex justify-center items-center"
                      tabIndex={-1}
                    >
                      <Image
                        src={ep.images.jpg.image_url}
                        alt={ep.title}
                        width={176}
                        height={176}
                        className="object-contain h-full max-h-44 w-auto transition-transform duration-200 group-hover:scale-105 cursor-pointer"
                      />
                    </a>
                  </Link>
                </div>
              )}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="font-bold text-lg text-blue-700 dark:text-blue-300 mb-1">
                    Episode {ep.mal_id}: {ep.title}
                  </div>
                  <div className="text-xs text-gray-500 mb-1">
                    Aired: {ep.aired ? ep.aired : "-"}
                  </div>
                  {ep.synopsis && (
                    <div className="text-xs text-gray-600 dark:text-gray-300 mb-2 text-justify">
                      {ep.synopsis}
                    </div>
                  )}
                </div>
                {ep.url && (
                  <Link
                    href={ep.url}
                    target="_blank"
                    className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-600 transition"
                  >
                    Tonton di MyAnimeList
                  </Link>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center text-gray-500">
            Tidak ada episode ditemukan.
          </div>
        )}
      </div>
    </div>
  );
}
