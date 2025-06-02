import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login.";
import Dashboard from "./pages/Dashboard";
import HOME from "./pages/Home";
// Route privée
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Router>


      {/* Routes */}
      <Routes>
      <Route path="/" element={<HOME />} />
        <Route path="/Login" element={<Login />} />
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
