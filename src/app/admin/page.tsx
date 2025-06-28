"use client";
import { useState } from "react";

export default function AdminPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Admin Login" : "Tambah/Edit Konten"}
        </h1>
        {isLogin ? (
          <form className="flex flex-col gap-4">
            <input
              className="p-2 rounded border"
              type="email"
              placeholder="Admin Email"
              required
            />
            <input
              className="p-2 rounded border"
              type="password"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded p-2 font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        ) : (
          <div className="text-center text-gray-500">
            Fitur tambah/edit/hapus anime & manga akan segera hadir.
          </div>
        )}
        <button
          className="mt-4 text-blue-500 hover:underline w-full"
          onClick={() => setIsLogin((v) => !v)}
        >
          {isLogin ? "Masuk sebagai admin" : "Kembali ke login"}
        </button>
      </div>
    </div>
  );
}
