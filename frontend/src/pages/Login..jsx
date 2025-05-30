import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import pour navigation
import { loginUser } from "../service/api";

export default function Login() {
  const navigate = useNavigate(); // Hook navigation

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    setMessage("");

    try {
      const token = await loginUser({ email, password });
      localStorage.setItem("token", token);

      setMessage("Connexion réussie ! Redirection...");

      // Redirection après 1.5s vers le dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setMessage(`Erreur de connexion : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">Connexion</h2>
            </div>

            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="peer w-full rounded-md border border-gray-300 px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="sr-only">Mot de passe</label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="peer w-full rounded-md border border-gray-300 px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      type="submit"
                      className="w-full rounded-md bg-blue-500 py-2.5 font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                      disabled={isLoading}
                    >
                      {isLoading ? "Connexion..." : "Se connecter"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {message && (
              <p
                className={`mt-4 text-center text-sm ${
                  message.startsWith("Erreur") ? "text-red-500" : "text-green-500"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
