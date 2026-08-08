import { Link } from "react-router";
import { Home as HomeIcon } from "lucide-react";

const NotFound = () => {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-[#0b0f19] text-white">
      <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase mb-4">404</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Page not found</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-black font-semibold hover:-translate-y-1 transition"
      >
        <HomeIcon size={18} />
        Back to Home
      </Link>
    </section>
  );
};

export default NotFound;
