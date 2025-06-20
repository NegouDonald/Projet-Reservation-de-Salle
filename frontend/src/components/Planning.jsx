import { useState, useEffect } from 'react';
import axios from 'axios';

function Planning() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlanning = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/reservations/planning');
        setReservations(response.data);
      } catch (error) {
        setError('Erreur lors du chargement du planning');
      }
    };
    fetchPlanning();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Planning des Salles</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Utilisateur</th>
            <th className="p-2 border">Salle</th>
            <th className="p-2 border">Matériel</th>
            <th className="p-2 border">Début</th>
            <th className="p-2 border">Fin</th>
            <th className="p-2 border">Statut</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="hover:bg-gray-100">
              <td className="p-2 border">{reservation.id}</td>
              <td className="p-2 border">{reservation.utilisateur}</td>
              <td className="p-2 border">{reservation.salle || '-'}</td>
              <td className="p-2 border">{reservation.materiel || '-'}</td>
              <td className="p-2 border">{new Date(reservation.dateDebut).toLocaleString()}</td>
              <td className="p-2 border">{new Date(reservation.dateFin).toLocaleString()}</td>
              <td className="p-2 border">{reservation.statut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Planning;