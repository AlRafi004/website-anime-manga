import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 mt-12 pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Tentang Kami */}
        <div>
          <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">
            Tentang Kami
          </h3>
          <p className="mb-2">
            JaksonAnimeManga adalah platform streaming & info anime/manga
            terlengkap, terinspirasi dari Crunchyroll, dengan nuansa biru khas
            Indonesia.
          </p>
          <p>&copy; {new Date().getFullYear()} JaksonAnimeManga</p>
        </div>
        {/* Navigasi */}
        <div>
          <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">
            Navigasi
          </h3>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/anime" className="hover:underline">
                Anime
              </Link>
            </li>
            <li>
              <Link href="/manga" className="hover:underline">
                Manga
              </Link>
            </li>
            <li>
              <Link href="/genres" className="hover:underline">
                Genre
              </Link>
            </li>
          </ul>
        </div>
        {/* Akun */}
        <div>
          <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">
            Akun
          </h3>
          <ul className="space-y-1">
            <li>
              <Link href="/auth" className="hover:underline">
                Login/Register
              </Link>
            </li>
            <li>
              <Link href="/user/bookmark" className="hover:underline">
                Bookmark
              </Link>
            </li>
            <li>
              <Link href="/user/history" className="hover:underline">
                History
              </Link>
            </li>
          </ul>
        </div>
        {/* Hubungi Kami */}
        <div>
          <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">
            Hubungi Kami
          </h3>
          <ul className="space-y-1">
            <li>
              Email:{" "}
              <a
                href="mailto:support@jaksonanimemanga.com"
                className="hover:underline"
              >
                support@jaksonanimemanga.com
              </a>
            </li>
            <li>
              Instagram:{" "}
              <a
                href="https://instagram.com/jaksonanimemanga"
                target="_blank"
                className="hover:underline"
              >
                @jaksonanimemanga
              </a>
            </li>
            <li>
              Twitter:{" "}
              <a
                href="https://twitter.com/jaksonanimemanga"
                target="_blank"
                className="hover:underline"
              >
                @jaksonanimemanga
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
