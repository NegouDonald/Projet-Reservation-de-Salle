import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login.";
import Dashboard from "./pages/Dashboard";

// Route privée
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Router>
      {/* Barre de navigation simple entre connexion et inscription */}
      <nav className="flex justify-center mt-4 space-x-4">
        <Link
          to="/"
          className="px-4 py-2 rounded bg-blue-400 text-white hover:bg-gray-300"
        >
          Connexion
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 rounded bg-blue-400 hover:bg-gray-300"
        >
          Inscription
        </Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
