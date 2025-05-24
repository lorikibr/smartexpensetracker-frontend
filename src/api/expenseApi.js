const API_URL = "http://localhost:8080/api/expenses";

export async function getExpenses() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function addExpense(expense) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });
  return await res.json();
}

export async function deleteExpense(id) {
  return await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}
