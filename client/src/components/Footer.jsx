import { FaFilm, FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <FaFilm className="text-brand" />
          <span>CineTrack © 2026</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <a href="#" className="hover:text-white transition" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="#" className="hover:text-white transition" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-white transition" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-white transition" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
