import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Planning from './Planning';
import CreateReservation from './CreateReservation';
import MyReservations from './MyReservations';
import FormationPlanning from './FormationPlanning';

function Dashboard() {
  const [role, setRole] = useState('ETUDIANT'); // Rôle par défaut
  const [username, setUsername] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const section = queryParams.get('section') || 'planning';

  return (
    <div className="flex">
      <Sidebar role={role} username={username} setUsername={setUsername} />
      <main className="ml-64 p-6 flex-grow">
        <div className="mb-6">
          <label className="mr-2">Rôle :</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="ETUDIANT">Étudiant</option>
            <option value="ENSEIGNANT">Enseignant</option>
            <option value="ENSEIGNANT_RESPONSABLE">Enseignant Responsable</option>
          </select>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {section === 'planning' && <Planning />}
          {section === 'create-reservation' && role !== 'ETUDIANT' && (
            <CreateReservation username={username} />
          )}
          {section === 'my-reservations' && (role === 'ENSEIGNANT' || role === 'ENSEIGNANT_RESPONSABLE') && (
            <MyReservations username={username} />
          )}
          {section === 'formation-planning' && role === 'ENSEIGNANT_RESPONSABLE' && (
            <FormationPlanning username={username} />
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;