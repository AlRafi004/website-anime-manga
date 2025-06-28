"use client";
import { useParams } from "next/navigation";

export default function AnimeCommentsPage() {
  const params = useParams();
  const { id } = params;
  // Placeholder: fetch comments by anime id
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Komentar untuk Anime #{id}</h2>
      <div className="rounded shadow p-4 text-center text-gray-500 bg-transparent dark:bg-transparent">
        Fitur komentar, like/dislike akan segera hadir.
      </div>
    </div>
  );
}
