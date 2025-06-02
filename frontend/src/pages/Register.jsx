import React, { useState } from "react";
import { registerUser } from "../service/api"; // Ta fonction d'inscription backend
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
 
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);
    try {
      await registerUser({ email, password });
      setMessage("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(`Erreur lors de l'inscription : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Inscription</h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-green-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Mot de passe</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Mot de passe"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-green-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6} // Exemple : minimum 6 caractères
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirmer le mot de passe</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-green-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-md bg-green-500 py-2.5 font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                >
                  {isLoading ? "Inscription..." : "S'inscrire"}
                </button>
              </div>
            </form>

            {message && (
              <p className={`mt-4 text-center text-sm ${message.startsWith("Erreur") ? "text-red-500" : "text-green-500"}`}>
                {message}
              </p>
            )}
          </div>
                    {/* Barre de navigation simple entre connexion et inscription */}
  <nav className="flex justify-center mt-4 space-x-4">
   <span> j'ai pas de compte </span>
         <Link
           to="/Login"
           className="px-4 py-2 rounded bg-blue-400 text-white hover:bg-gray-300"
         >
           Connexion
         </Link>

 </nav>
        </div>

      </div>
    </div>
  );
}
