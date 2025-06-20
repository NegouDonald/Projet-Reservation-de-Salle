import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [myReservations, setMyReservations] = useState([]);
  const [planningFormation, setPlanningFormation] = useState([]);
  const [salles, setSalles] = useState([]);
  const [materiels, setMateriels] = useState([]);
  const [formData, setFormData] = useState({
    salleId: '',
    materielId: '',
    dateDebut: '',
    dateFin: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Aucun token trouvé. Veuillez vous connecter.');
    }
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  useEffect(() => {
    fetchSalles();
    fetchMateriels();
    fetchReservations();
    fetchMyReservations();
    fetchPlanningFormation();
  }, []);

  const fetchSalles = async () => {
    try {
      console.log('Récupération des salles...');
      const response = await axios.get('http://localhost:8080/api/salles', getAuthHeader());
      console.log('Réponse API salles:', response.data);
      if (Array.isArray(response.data)) {
        setSalles(response.data);
      } else {
        setError('Les données des salles ne sont pas au format attendu');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des salles:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      setError(err.response?.data?.message || 'Erreur lors de la récupération des salles');
    }
  };

  const fetchMateriels = async () => {
    try {
      console.log('Récupération des matériels...');
      const response = await axios.get('http://localhost:8080/api/materiels', getAuthHeader());
      console.log('Réponse API matériels:', response.data);
      if (Array.isArray(response.data)) {
        setMateriels(response.data);
      } else {
        setError('Les données des matériels ne sont pas au format attendu');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des matériels:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      setError(err.response?.data?.message || 'Erreur lors de la récupération des matériels');
    }
  };

  const fetchReservations = async () => {
    setLoading(true);
    try {
      console.log('Récupération du planning général...');
      const response = await axios.get('http://localhost:8080/api/reservations/planning', getAuthHeader());
      console.log('Réponse API planning:', response.data);
      if (Array.isArray(response.data)) {
        setReservations(response.data);
      } else {
        setError('Les données des réservations ne sont pas au format attendu');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération du planning:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expirée ou accès non autorisé. Veuillez vous reconnecter.');
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(err.response?.data?.message || 'Erreur lors de la récupération du planning');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMyReservations = async () => {
    setLoading(true);
    try {
      console.log('Récupération de mes réservations...');
      const response = await axios.get('http://localhost:8080/api/reservations/mes-reservations', getAuthHeader());
      console.log('Réponse API mes réservations:', response.data);
      if (Array.isArray(response.data)) {
        setMyReservations(response.data);
      } else {
        setError('Les données de mes réservations ne sont pas au format attendu');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération de mes réservations:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expirée ou accès non autorisé. Veuillez vous reconnecter.');
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(err.response?.data?.message || 'Erreur lors de la récupération de mes réservations');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPlanningFormation = async () => {
    setLoading(true);
    try {
      console.log('Récupération du planning de formation...');
      const response = await axios.get('http://localhost:8080/api/reservations/planning-formation', getAuthHeader());
      console.log('Réponse API planning formation:', response.data);
      if (Array.isArray(response.data)) {
        setPlanningFormation(response.data);
      } else {
        setError('Les données du planning de formation ne sont pas au format attendu');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération du planning de formation:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expirée ou accès non autorisé. Veuillez vous reconnecter.');
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(err.response?.data?.message || 'Erreur lors de la récupération du planning de formation');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        salleId: formData.salleId ? parseInt(formData.salleId) : null,
        materielId: formData.materielId ? parseInt(formData.materielId) : null,
        dateDebut: formData.dateDebut,
        dateFin: formData.dateFin,
      };
      console.log('Envoi de la réservation:', data);
      const response = await axios.post('http://localhost:8080/api/reservations', data, getAuthHeader());
      console.log('Réservation créée:', response.data);
      setSuccess('Réservation créée avec succès');
      setFormData({ salleId: '', materielId: '', dateDebut: '', dateFin: '' });
      fetchReservations();
      fetchMyReservations();
      fetchPlanningFormation();
    } catch (err) {
      console.error('Erreur lors de la création de la réservation:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expirée ou accès non autorisé. Veuillez vous reconnecter.');
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(err.response?.data?.message || err.response?.data || 'Erreur lors de la création de la réservation');
      }
    } finally {
      setLoading(false);
      setTimeout(() => setError(''), 3000);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleValidate = async (id) => {
    setLoading(true);
    try {
      console.log('Validation de la réservation ID:', id);
      await axios.put(`http://localhost:8080/api/reservations/${id}/valider`, {}, getAuthHeader());
      setSuccess('Réservation validée avec succès');
      fetchReservations();
      fetchMyReservations();
      fetchPlanningFormation();
    } catch (err) {
      console.error('Erreur lors de la validation:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      setError(err.response?.data?.message || 'Erreur lors de la validation de la réservation');
    } finally {
      setLoading(false);
      setTimeout(() => setError(''), 3000);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleRefuse = async (id) => {
    setLoading(true);
    try {
      console.log('Refus de la réservation ID:', id);
      await axios.put(`http://localhost:8080/api/reservations/${id}/refuser`, {}, getAuthHeader());
      setSuccess('Réservation refusée avec succès');
      fetchReservations();
      fetchMyReservations();
      fetchPlanningFormation();
    } catch (err) {
      console.error('Erreur lors du refus:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      setError(err.response?.data?.message || 'Erreur lors du refus de la réservation');
    } finally {
      setLoading(false);
      setTimeout(() => setError(''), 3000);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return {
    reservations,
    myReservations,
    planningFormation,
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