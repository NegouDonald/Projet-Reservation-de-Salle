import { Link } from 'react-router-dom';

function Sidebar({ role, username, setUsername }) {
  return (
    <div className="w-64 bg-blue-800 text-white h-screen p-4 fixed">
      <h2 className="text-2xl font-bold mb-6">Réservation Salles</h2>
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 mb-4 text-black rounded-md"
      />
      <nav className="space-y-2">
        <Link to="/dashboard" className="block p-2 rounded hover:bg-blue-700">Tableau de bord</Link>
        {role === 'ENSEIGNANT' && (
          <>
            <Link to="/dashboard?section=create-reservation" className="block p-2 rounded hover:bg-blue-700">Créer Réservation</Link>
            <Link to="/dashboard?section=my-reservations" className="block p-2 rounded hover:bg-blue-700">Mes Réservations</Link>
          </>
        )}
        {role === 'ENSEIGNANT_RESPONSABLE' && (
          <>
            <Link to="/dashboard?section=create-reservation" className="block p-2 rounded hover:bg-blue-700">Créer Réservation</Link>
            <Link to="/dashboard?section=my-reservations" className="block p-2 rounded hover:bg-blue-700">Mes Réservations</Link>
            <Link to="/dashboard?section=formation-planning" className="block p-2 rounded hover:bg-blue-700">Planning Formation</Link>
          </>
        )}
        <Link to="/register" className="block p-2 rounded hover:bg-blue-700">Inscription</Link>
      </nav>
    </div>
  );
}

export default Sidebar;