import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useSalles = () => {
  const [salles, setSalles] = useState([]);
  const [formData, setFormData] = useState({
    nom: '',
    capacite: '',
    batiment: '',
    disponible: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSalles();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Aucun token trouvé. Veuillez vous connecter.');
    }
    return { Authorization: `Bearer ${token}` };
  };

  const fetchSalles = async () => {
    setLoading(true);
    try {
      console.log('Récupération des salles...');
      const response = await axios.get('http://localhost:8080/api/salles', {
        headers: getAuthHeaders(),
      });
      console.log('Réponse API:', response.data);
      if (Array.isArray(response.data)) {
        setSalles(response.data);
      } else {
        console.error('La réponse de l\'API n\'est pas un tableau:', response.data);
        setSalles([]);
        setError('Les données reçues ne sont pas au format attendu');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des salles:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      if (err.response?.status === 401) {
        setError('Session expirée. Veuillez vous reconnecter.');
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(err.response?.data || err.message || 'Erreur lors de la récupération des salles');
      }
      setSalles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...formData,
        capacite: parseInt(formData.capacite),
      };
      if (editingId) {
        console.log('Mise à jour de la salle ID:', editingId, data);
        await axios.put(`http://localhost:8080/api/salles/${editingId}`, data, {
          headers: getAuthHeaders(),
        });
        setSuccess('Salle mise à jour avec succès');
      } else {
        console.log('Création de la salle:', data);
        await axios.post('http://localhost:8080/api/salles', data, {
          headers: getAuthHeaders(),
        });
        setSuccess('Salle créée avec succès');
      }
      setFormData({ nom: '', capacite: '', batiment: '', disponible: true });
      setEditingId(null);
      fetchSalles();
    } catch (err) {
      console.error('Erreur lors de la soumission:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      setError(err.response?.data || err.message || 'Erreur lors de la soumission');
    } finally {
      setLoading(false);
      setTimeout(() => setError(''), 3000);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleEdit = (salle) => {
    console.log('Édition de la salle:', salle);
    setEditingId(salle.id);
    setFormData({
      nom: salle.nom || '',
      capacite: salle.capacite || '',
      batiment: salle.batiment || '',
      disponible: salle.disponible,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette salle ?')) {
      setLoading(true);
      try {
        console.log('Suppression de la salle ID:', id);
        await axios.delete(`http://localhost:8080/api/salles/${id}`, {
          headers: getAuthHeaders(),
        });
        setSuccess('Salle supprimée avec succès');
        fetchSalles();
      } catch (err) {
        console.error('Erreur lors de la suppression:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
        setError(err.response?.data || err.message || 'Erreur lors de la suppression');
      } finally {
        setLoading(false);
        setTimeout(() => setError(''), 3000);
        setTimeout(() => setSuccess(''), 3000);
      }
    }
  };

  return {
    salles,
    formData,
    editingId,
    error,
    success,
    loading,
    handleInputChange,
    handleSubmit,
    handleEdit,
    handleDelete,
  };
};