"use client";
import { useParams } from "next/navigation";

export default function ChapterListPage() {
  const params = useParams();
  const { id } = params;
  // Placeholder: fetch chapter list by manga id
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Daftar Chapter Manga #{id}</h2>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-4 text-center text-gray-500">
        Fitur daftar chapter & manga reader akan segera hadir.
      </div>
    </div>
  );
}
