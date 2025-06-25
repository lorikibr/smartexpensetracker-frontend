// Defines the base URL for the expense API
const API_URL = "http://localhost:8080/api/expenses";

// Fetches all expenses from the API
export async function getExpenses() {
  const res = await fetch(API_URL);
  return await res.json(); // Returns data as JSON
}

// Adds a new expense
export async function addExpense(expense) {
  const res = await fetch(API_URL, {
    method: 'POST', // Use POST for creating new resources
    headers: { 'Content-Type': 'application/json' }, // Tell the server we're sending JSON
    body: JSON.stringify(expense), // Convert expense object to JSON string
  });
  return await res.json(); // Returns the created expense object
}

// Deletes an expense by its ID
export async function deleteExpense(id) {
  // Returns the response of the DELETE request
  return await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}

// Updates an existing expense by its ID
export async function updateExpense(id, updatedExpense) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT', // Use PUT for updating existing resources
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedExpense), // Convert updated expense object to JSON string
  });
  return await res.json(); // Returns the updated expense object
}
