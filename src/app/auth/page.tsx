"use client";
import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-900 dark:to-gray-900">
      {/* Video background full page */}
      <video
        src="/video-login.mp4"
        className="fixed inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        poster="/anime-login.jpg"
      />
      {/* Overlay agar form tetap jelas */}
      <div className="fixed inset-0 bg-black/40 z-10" />
      <div className="relative z-20 w-full max-w-md mx-auto bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-md p-8 my-16 backdrop-blur">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h1>
        <form className="flex flex-col gap-4">
          <input
            className="p-2 rounded border"
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="p-2 rounded border"
            type="password"
            placeholder="Password"
            required
          />
          {!isLogin && (
            <input
              className="p-2 rounded border"
              type="text"
              placeholder="Username"
              required
            />
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded p-2 font-semibold hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <button
          className="mt-4 text-blue-500 hover:underline w-full"
          onClick={() => setIsLogin((v) => !v)}
        >
          {isLogin ? "Belum punya akun? Register" : "Sudah punya akun? Login"}
        </button>
      </div>
    </div>
  );
}
