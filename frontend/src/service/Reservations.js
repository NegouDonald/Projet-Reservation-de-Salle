import { useState, useEffect } from 'react';
import axios from 'axios';

export const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [salles, setSalles] = useState([]);
  const [materiels, setMateriels] = useState([]);
  const [formData, setFormData] = useState({
    dateDebut: '',
    dateFin: '',
    salleId: '',
    materielId: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

  useEffect(() => {
    fetchSalles();
    fetchMateriels();
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/reservations/mes-reservations', getAuthHeader());
      if (Array.isArray(response.data)) {
        setReservations(response.data);
      } else {
        setError('Les données reçues ne sont pas au format attendu');
        setReservations([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la récupération des réservations');
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSalles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/salles', getAuthHeader());
      if (Array.isArray(response.data)) {
        setSalles(response.data);
      }
    } catch (err) {
      setError('Erreur lors de la récupération des salles');
    }
  };

  const fetchMateriels = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/materiels', getAuthHeader());
      if (Array.isArray(response.data)) {
        setMateriels(response.data);
      }
    } catch (err) {
      setError('Erreur lors de la récupération des matériels');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/reservations', {
        ...formData,
        dateDebut: formData.dateDebut + ':00',
        dateFin: formData.dateFin + ':00',
      }, getAuthHeader());
      setSuccess('Réservation créée avec succès');
      setFormData({ dateDebut: '', dateFin: '', salleId: '', materielId: '' });
      fetchReservations();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création de la réservation');
    }
    setTimeout(() => setError(''), 3000);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleValidate = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/reservations/${id}/valider`, {}, getAuthHeader());
      setSuccess('Réservation validée avec succès');
      fetchReservations();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la validation');
    }
    setTimeout(() => setError(''), 3000);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleRefuse = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/reservations/${id}/refuser`, {}, getAuthHeader());
      setSuccess('Réservation refusée avec succès');
      fetchReservations();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du refus');
    }
    setTimeout(() => setError(''), 3000);
    setTimeout(() => setSuccess(''), 3000);
  };

  return {
    reservations,
    salles,
    materiels,
    formData,
    error,
    success,
    loading,
    handleInputChange,
    handleSubmit,
    handleValidate,
    handleRefuse,
  };
};