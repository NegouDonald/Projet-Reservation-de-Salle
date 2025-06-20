import { useSalles } from '../service/Salles';

const Salles = () => {
  const {
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
  } = useSalles();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-8">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Gestion des Salles</h1>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-6 rounded-2xl shadow-xl max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <input
              id="nom"
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200"
              placeholder="Entrez le nom de la salle"
              required
            />
          </div>
          <div>
            <label htmlFor="capacite" className="block text-sm font-medium text-gray-700">
              Capacité
            </label>
            <input
              id="capacite"
              type="number"
              name="capacite"
              value={formData.capacite}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200"
              placeholder="Entrez la capacité"
              required
              min="1"
            />
          </div>
          <div>
            <label htmlFor="batiment" className="block text-sm font-medium text-gray-700">
              Bâtiment
            </label>
            <input
              id="batiment"
              type="text"
              name="batiment"
              value={formData.batiment}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-200"
              placeholder="Entrez le bâtiment"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              id="disponible"
              type="checkbox"
              name="disponible"
              checked={formData.disponible}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="disponible" className="ml-2 block text-sm font-medium text-gray-700">
              Disponible
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105"
          disabled={loading}
        >
          {loading ? 'Traitement...' : editingId ? 'Mettre à jour' : 'Ajouter'}
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
        <p className="text-center text-gray-600 animate-pulse">Chargement des salles...</p>
      )}

      {/* Liste des salles */}
      {!loading && salles.length === 0 && !error ? (
        <div className="text-center text-gray-600">Aucune salle disponible</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {salles.map((salle) => (
            <div
              key={salle.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <h3 className="text-lg font-semibold text-indigo-600">{salle.nom || 'Nom non spécifié'}</h3>
              <p className="text-gray-600">Capacité : {salle.capacite || 'Non spécifié'}</p>
              <p className="text-gray-600">Bâtiment : {salle.batiment || 'Non spécifié'}</p>
              <p className="text-gray-600">
                Statut :{' '}
                <span className={salle.disponible ? 'text-green-600' : 'text-red-600'}>
                  {salle.disponible ? 'Disponible' : 'Indisponible'}
                </span>
              </p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(salle)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  disabled={loading}
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(salle.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  disabled={loading}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Salles;