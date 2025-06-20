import { useState } from 'react';
import axios from 'axios';

function CreateReservation({ username }) {
  const [formData, setFormData] = useState({
    salleId: '',
    materielId: '',
    dateDebut: '',
    dateFin: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/reservations', {
        ...formData,
        username,
      });
      setMessage('Réservation créée avec succès !');
      setFormData({
        salleId: '',
        materielId: '',
        dateDebut: '',
        dateFin: '',
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de la réservation');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Créer une Réservation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">ID Salle</label>
          <input
            type="number"
            name="salleId"
            value={formData.salleId}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">ID Matériel</label>
          <input
            type="number"
            name="materielId"
            value={formData.materielId}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date de début</label>
          <input
            type="datetime-local"
            name="dateDebut"
            value={formData.dateDebut}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date de fin</label>
          <input
            type="datetime-local"
            name="dateFin"
            value={formData.dateFin}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Réserver
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
}

export default CreateReservation;