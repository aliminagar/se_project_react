const BASE_URL = "http://localhost:3001"; // Update if your backend runs elsewhere

// Helper function to get headers with token
function getHeaders(token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`; // Capitalized 'Authorization'
  }
  return headers;
}

// GET /items - No token required (public endpoint)
export function getItems() {
  return fetch(`${BASE_URL}/items`, {
    method: "GET",
    headers: getHeaders(), // No token needed
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}

// POST /items - Token required
export function addItem(data, token) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}

// DELETE /items/:id - Token required
export function deleteCard(id, token) {
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}

// PUT /items/:id/likes - Token required (Add like)
export function addCardLike(id, token) {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}

// DELETE /items/:id/likes - Token required (Remove like)
export function removeCardLike(id, token) {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}

// GET /users/me - Token required (Get current user profile)
export function getProfile(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}

export function updateProfile(data, token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}
