const API_URL = "http://localhost:8080/api/auth";
const USER_API_URL = "http://localhost:8080/api/user";

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }
  return response.text();
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }
  const data = await response.json();
  return data.token;
}

export async function fetchUserEmail() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${USER_API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    const data = await res.json();
    return data.email;
  } else {
    throw new Error("Erreur lors de la récupération de l'utilisateur");
  }
}
