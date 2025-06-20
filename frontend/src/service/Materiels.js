import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useMateriels = () => {
  const [materiels, setMateriels] = useState([]);
  const [materialTypes, setMaterialTypes] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    materialType: { id: '' },
  });
  const [editingId, setEditingId] = useState(null);
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
    fetchMateriels();
    fetchMaterialTypes();
  }, []);

  const fetchMateriels = async () => {
    setLoading(true);
    try {
      console.log('Récupération des matériels avec token:', localStorage.getItem('token'));
      const response = await axios.get('http://localhost:8080/api/materiels', getAuthHeader());
      console.log('Réponse API matériels:', response.data);
      if (Array.isArray(response.data)) {
        setMateriels(response.data);
      } else {
        console.error('La réponse n\'est pas un tableau:', response.data);
        setError('Les données reçues ne sont pas au format attendu');
        setMateriels([]);
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des matériels:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        headers: err.response?.headers,
      });
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expirée ou accès non autorisé. Veuillez vous reconnecter.');
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(err.response?.data?.message || err.message || 'Erreur lors de la récupération des matériels');
      }
      setMateriels([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMaterialTypes = async () => {
    try {
      console.log('Récupération des types de matériels...');
      const response = await axios.get('http://localhost:8080/api/material-types', getAuthHeader());
      console.log('Réponse API types de matériels:', response.data);
      if (Array.isArray(response.data)) {
        setMaterialTypes(response.data);
      } else {
        console.error('La réponse n\'est pas un tableau:', response.data);
        setError('Les données reçues ne sont pas au format attendu');
        setMaterialTypes([]);
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des types de matériels:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expirée ou accès non autorisé. Veuillez vous reconnecter.');
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(err.response?.data?.message || err.message || 'Erreur lors de la récupération des types de matériels');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'materialType') {
      setFormData({ ...formData, materialType: { id: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Données envoyées:', formData);
    try {
      const data = {
        type: formData.type,
        materialType: { id: parseInt(formData.materialType.id) },
      };
      if (editingId) {
        console.log('Mise à jour du matériel ID:', editingId);
        await axios.put(`http://localhost:8080/api/materiels/${editingId}`, data, getAuthHeader());
        setSuccess('Matériel mis à jour avec succès');
      } else {
        console.log('Création du matériel...');
        await axios.post('http://localhost:8080/api/materiels', data, getAuthHeader());
        setSuccess('Matériel créé avec succès');
      }
      setFormData({ type: '', materialType: { id: '' } });
      setEditingId(null);
      fetchMateriels();
    } catch (err) {
      console.error('Erreur lors de la soumission:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      setError(err.response?.data?.message || err.message || 'Erreur lors de la soumission du matériel');
    } finally {
      setLoading(false);
      setTimeout(() => setError(''), 3000);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleEdit = (materiel) => {
    console.log('Édition du matériel:', materiel);
    setEditingId(materiel.id);
    setFormData({
      type: materiel.type || '',
      materialType: { id: materiel.materialType?.id || '' },
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce matériel ?')) {
      setLoading(true);
      try {
        console.log('Suppression du matériel ID:', id);
        await axios.delete(`http://localhost:8080/api/materiels/${id}`, getAuthHeader());
        setSuccess('Matériel supprimé avec succès');
        fetchMateriels();
      } catch (err) {
        console.error('Erreur lors de la suppression:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      setError(err.response?.data?.message || err.message || 'Erreur lors de la suppression du matériel');
    } finally {
      setLoading(false);
      setTimeout(() => setError(''), 3000);
      setTimeout(() => setSuccess(''), 3000);
    }
  }
};

  return {
    materiels,
    materialTypes,
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