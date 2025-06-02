
import React, { useEffect, useState } from "react";
import { fetchUserInfo } from "../service/api";
const token = localStorage.getItem("token");

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // assure-toi que le token est stocké
    if (!token) {
      setError("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }

    fetchUserInfo(token)
      .then((data) => setUserInfo(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p style={{ color: "red" }}>Erreur : {error}</p>;
  if (!userInfo) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Email : {userInfo.email}</p>
      <p>Rôles : {userInfo.roles.join(", ")}</p>
    </div>
  );
}

export default Dashboard;
