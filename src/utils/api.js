const isLocal = window.location.hostname === "localhost";
const baseUrl = "http://localhost:3001"; // used only when running locally

// Check the response
export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// GET items
function getItems() {
  return fetch("/items.json")
    .then(checkResponse)
    .then((data) => data.items); // because the top-level key is "items"
}

// ADD new item (using _id)
function addItem(itemData) {
  if (!isLocal) {
    alert("Adding items is disabled on the deployed site.");
    return Promise.resolve();
  }

  const itemWithId = { ...itemData, _id: Date.now().toString() };

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemWithId),
  }).then(checkResponse);
}

// DELETE by _id
function deleteCard(_id) {
  if (!isLocal) {
    alert("Deleting items is disabled on the deployed site.");
    return Promise.resolve();
  }

  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
  }).then(checkResponse);
}

export { getItems, deleteCard, addItem };
