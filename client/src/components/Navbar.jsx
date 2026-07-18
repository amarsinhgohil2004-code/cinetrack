import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaFilm, FaBars, FaTimes, FaPlus, FaUserCircle } from "react-icons/fa";

import { getMovies } from "../services/api.js";
import { toast } from "react-toastify";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const [totalMovies, setTotalMovies] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  // Get Movie Count
  useEffect(() => {
    const fetchMovieCount = async () => {
      if (!user) return;

      try {
        const movies = await getMovies();

        setTotalMovies(movies.length);
      } catch (error) {
        console.error("Navbar movie count error:", error);
      }
    };

    fetchMovieCount();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 800);
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? "text-white" : "text-slate-400 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-bg/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}

        <Link
          to="/"
          onClick={handleHomeClick}
          className="flex items-center gap-2"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand shadow-glow">
            <FaFilm className="text-white" />
          </span>

          <span className="text-lg font-bold tracking-tight">
            Cine<span className="text-brand">Track</span>
          </span>
        </Link>

        {/* Desktop Menu */}

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" end className={linkClass} onClick={handleHomeClick}>
            Home
          </NavLink>

          {user ? (
            <>
              <NavLink to="/add" className={linkClass}>
                Add Movie
              </NavLink>

              <span className="badge bg-white/10 text-slate-200">
                {totalMovies} Movies
              </span>

              <div className="flex items-center gap-2 text-white">
                <FaUserCircle size={22} />

                <span className="font-medium">{user.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-red-500 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>

              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          )}

          <Link
            to={user ? "/add" : "/login"}
            className="btn-primary flex items-center gap-2"
          >
            <FaPlus />
            Add
          </Link>
        </nav>

        {/* Mobile Button */}

        <button
          className="text-slate-300 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="border-t border-white/10 bg-bg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4">
            <NavLink
              to="/"
              end
              className={linkClass}
              onClick={(e) => {
                setOpen(false);
                handleHomeClick(e);
              }}
            >
              Home
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/add"
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  Add Movie
                </NavLink>

                <span className="badge w-fit bg-white/10 text-slate-200">
                  {totalMovies} Movies
                </span>

                <div className="flex items-center gap-2 text-white">
                  <FaUserCircle size={20} />

                  <span>{user.name}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-fit rounded-lg border border-red-500 px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}

            <Link
              to={user ? "/add" : "/login"}
              onClick={() => setOpen(false)}
              className="btn-primary flex w-fit items-center gap-2"
            >
              <FaPlus />
              Add
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
