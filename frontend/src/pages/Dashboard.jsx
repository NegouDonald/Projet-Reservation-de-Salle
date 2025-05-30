// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { fetchUserEmail } from "../service/api"; // bien importer la fonction

export default function Dashboard() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getEmail() {
      try {
        const userEmail = await fetchUserEmail();
        setEmail(userEmail);
      } catch (error) {
        console.error("Erreur récupération email:", error);
      }
    }
    getEmail();
  }, []);

  return (
    <div>
      <h1>Bienvenue sur ton dashboard</h1>
      {email ? <p>Email connecté : {email}</p> : <p>Chargement...</p>}
    </div>
  );
}
