import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Réservation Salles</Link>
        <div className="space-x-4">
          <Link to="/register" className="hover:underline">Inscription</Link>
          <Link to="/create-reservation" className="hover:underline">Réserver</Link>
          <Link to="/my-reservations" className="hover:underline">Mes Réservations</Link>
          <Link to="/formation-planning" className="hover:underline">Planning Formation</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;