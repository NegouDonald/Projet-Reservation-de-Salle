import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Données envoyées:', formData);
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
      console.log('Token reçu:', response.data.token);
      localStorage.setItem('token', response.data.token);
      navigate('/reservations');
    } catch (err) {
      setError(err.response?.data || 'Erreur de connexion');
      console.error('Erreur API:', err.response?.data);
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Connexion</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200"
              placeholder="Entrez votre nom d'utilisateur"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200"
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm animate-fade-in">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Pas de compte ?{' '}
          <a href="/register" className="text-indigo-600 hover:text-indigo-800 font-medium">
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;