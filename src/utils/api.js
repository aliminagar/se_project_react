const baseUrl = "http://localhost:3001";

// Check the response
export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// GET all items
function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

// ADD new item (using _id)
function addItem(itemData) {
  const itemWithId = { ...itemData, _id: Date.now().toString() }; // âœ… Only _id, no id

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemWithId),
  }).then(checkResponse);
}

// DELETE by _id (correct!)
function deleteCard(_id) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
  }).then(checkResponse);
}

export { getItems, deleteCard, addItem };
