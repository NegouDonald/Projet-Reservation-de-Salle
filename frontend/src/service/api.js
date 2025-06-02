const token = localStorage.getItem("token");
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

export async function fetchUserInfo(token) {
  const response = await fetch("http://localhost:8080/api/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',  // <== important pour que les cookies / credentials passent avec CORS
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }

  return await response.json();
}

