import React, { useState } from "react";
 
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
 
export default function Home() {
  
  return (
    <div  className="mt-50" >
  
       {/* Barre de navigation simple entre connexion et inscription */}
       <nav className="flex justify-center mt-4 space-x-4">
        <Link
          to="/Login"
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
    </div>
  );
}
