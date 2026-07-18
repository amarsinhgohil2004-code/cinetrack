import { useLocation, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import AddMovie from "./pages/AddMovie.jsx";
import EditMovie from "./pages/EditMovie.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex min-h-screen flex-col bg-bg text-white">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Home */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Authentication */}

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* Add Movie */}

          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddMovie />
              </ProtectedRoute>
            }
          />

          {/* Edit Movie */}

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditMovie />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}
