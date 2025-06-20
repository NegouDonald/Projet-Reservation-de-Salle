 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
import Login from './pages/Login.';
import Reservations from './components/Reservations';
import Materiels from './components/Materiels';
import Register from './pages/Register';
import Salles from './components/Salles';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/Salles" element={<Salles />} />
        <Route path="/" element={<Register />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/materiels" element={<Materiels />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;