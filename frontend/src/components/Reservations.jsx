import { useReservations } from '../service/useReservations';
import { useEffect, useState } from 'react';

const Reservations = () => {
  const {
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
  } = useReservations();

  const [isEnseignantResponsable, setIsEnseignantResponsable] = useState(false);

  useEffect(() => {
    // Simuler la vérification du rôle (à remplacer par une requête API ou un contexte auth)
    const token = localStorage.getItem('token');
    if (token) {
      setIsEnseignantResponsable(true); // À ajuster selon le rôle réel
    }
  }, []);

  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'N/A';
    return new Date(dateTime).toLocaleString('fr-FR');
  };

  const validateForm = () => {
    if (!formData.salleId) {
      return 'Veuillez sélectionner une salle.';
    }
    if (!formData.dateDebut || !formData.dateFin) {
      return 'Veuillez spécifier les dates de début et de fin.';
    }
    if (new Date(formData.dateDebut) >= new Date(formData.dateFin)) {
      return 'La date de début doit être antérieure à la date de fin.';
    }
    if (new Date(formData.dateDebut) < new Date()) {
      return 'La date de début ne peut pas être dans le passé.';
    }
    return null;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setTimeout(() => setError(''), 3000);
      return;
    }
    handleSubmit(e);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-8">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Gestion des Réservations</h1>

      {/* Formulaire de création */}
      <form
        onSubmit={onSubmit}
        className="mb-8 bg-white p-6 rounded-2xl shadow-xl max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="salleId" className="block text-sm font-medium text-gray-700">
              Salle
            </label>
            <select
              id="salleId"
              name="salleId"
              value={formData.salleId}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200"
              required
            >
              <option value="">Sélectionner une salle</option>
              {salles.map((salle) => (
                <option key={salle.id} value={salle.id}>
                  {salle.nom || 'Non spécifié'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="materielId" className="block text-sm font-medium text-gray-700">
              Matériel (facultatif)
            </label>
            <select
              id="materielId"
              name="materielId"
              value={formData.materielId}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200"
            >
              <option value="">Aucun matériel</option>
              {materiels.map((materiel) => (
                <option key={materiel.id} value={materiel.id}>
                  {materiel.type || 'Non spécifié'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
              Date et heure de début
            </label>
            <input
              id="dateDebut"
              type="datetime-local"
              name="dateDebut"
              value={formData.dateDebut}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
              Date et heure de fin
            </label>
            <input
              id="dateFin"
              type="datetime-local"
              name="dateFin"
              value={formData.dateFin}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105"
          disabled={loading}
        >
          {loading ? 'Traitement...' : 'Réserver'}
        </button>
      </form>

      {/* Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-sm animate-fade-in max-w-2xl mx-auto">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-sm animate-fade-in max-w-2xl mx-auto">
          {success}
        </div>
      )}

      {/* État de chargement */}
      {loading && (
        <p className="text-center text-gray-600 animate-pulse">Chargement des réservations...</p>
      )}

      {/* Mes réservations */}
      <div className="mb-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Mes Réservations</h2>
        {myReservations.length === 0 && !loading ? (
          <div className="text-center text-gray-600">Aucune réservation personnelle</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <h3 className="text-lg font-semibold text-indigo-600">
                  Réservation #{reservation.id}
                </h3>
                <p className="text-gray-600">Salle : {reservation.salleNom || 'N/A'}</p>
                <p className="text-gray-600">Matériel : {reservation.materielType || 'N/A'}</p>
                <p className="text-gray-600">Début : {formatDateTime(reservation.dateDebut)}</p>
                <p className="text-gray-600">Fin : {formatDateTime(reservation.dateFin)}</p>
                <p className="text-gray-600">
                  Statut :{' '}
                  <span
                    className={
                      reservation.statut === 'VALIDEE'
                        ? 'text-green-600'
                        : reservation.statut === 'REFUSEE'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }
                  >
                    {reservation.statut || 'N/A'}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Planning général */}
      <div className="mb-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Planning Général</h2>
        {reservations.length === 0 && !loading ? (
          <div className="text-center text-gray-600">Aucune réservation</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <h3 className="text-lg font-semibold text-indigo-600">
                  Réservation #{reservation.id}
                </h3>
                <p className="text-gray-600">Utilisateur : {reservation.utilisateurUsername || 'N/A'}</p>
                <p className="text-gray-600">Salle : {reservation.salleNom || ''}</p>
                <p className="text-gray-600">Matériel : {reservation.materielType || 'N/A'}</p>
                <p className="text-gray-600">Début : {formatDateTime(reservation.dateDebut)}</p>
                <p className="text-gray-600">Fin : {formatDateTime(reservation.dateFin)}</p>
                <p className="text-gray-600">
                  Statut :{' '}
                  <span
                    className={
                      reservation.statut === 'VALIDEE'
                        ? 'text-green-600'
                        : reservation.statut === 'REFUSEE'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }
                  >
                    {reservation.statut || 'N/A'}
                  </span>
                </p>
                {isEnseignantResponsable && reservation.statut === 'EN_ATTENTE' && (
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleValidate(reservation.id)}
                      className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      disabled={loading}
                    >
                      Valider
                    </button>
                    <button
                      onClick={() => handleRefuse(reservation.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      disabled={loading}
                    >
                      Refuser
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Planning de formation (enseignants responsables) */}
      {isEnseignantResponsable && (
        <div className="mb-6 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Planning de Formation</h2>
          {planningFormation.length === 0 && !loading ? (
            <div className="text-center text-gray-600">Aucun planning de formation</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planningFormation.map((reservation) => (
                <div
                  key={reservation.id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                  <h3 className="text-lg font-semibold text-indigo-600">
                    Réservation #{reservation.id}
                  </h3>
                  <p className="text-gray-600">Utilisateur : {reservation.utilisateurUsername || ''}</p>
                  <p className="text-gray-600">Salle : {reservation.salleNom || 'N/A'}</p>
                  <p className="text-gray-600">Matériel : {reservation.materielType || 'N/A'}</p>
                  <p className="text-gray-600">Début : {formatDateTime(reservation.dateDebut)}</p>
                  <p className="text-gray-600">Fin : {formatDateTime(reservation.dateFin)}</p>
                  <p className="text-gray-600">
                    Statut :{' '}
                    <span
                      className={
                        reservation.statut === 'VALIDEE'
                          ? 'text-green-600'
                          : reservation.statut === 'REFUSEE'
                          ? 'text-red-600'
                          : 'text-blue-600'
                      }
                    >
                      {reservation.statut || 'N/A'}
                    </span>
                  </p>
                  {reservation.statut === 'EN_ATTENTE' && (
                    <div className="mt-2 flex space-x-4">
                      <button
                        onClick={() => handleValidate(reservation.id)}
                        className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={loading}
                      >
                        Valider
                      </button>
                      <button
                        onClick={() => handleRefuse(reservation.id)}
                        className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        disabled={loading}
                      >
                        Refuser
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reservations;