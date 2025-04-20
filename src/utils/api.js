const baseUrl = "http://localhost:3001";

// Handles response status
export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// GET all items
function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

// ADD a new item
function addItem(itemData) {
  const uniqueId = Date.now().toString(); // generate unique ID

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...itemData,
      id: uniqueId, // Include generated ID
    }),
  }).then(checkResponse);
}

// DELETE an item by ID
function deleteCard(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
}

// Export all
export { getItems, deleteCard, addItem };
