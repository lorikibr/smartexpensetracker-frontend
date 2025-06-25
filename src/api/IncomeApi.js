// src/api/IncomeApi.js

// Base URL for the income API endpoints
const API_BASE_URL = "http://localhost:8080/api/incomes";

// Fetches all income records
export async function getIncomes() {
  try {
    const response = await fetch(API_BASE_URL);
    // Check if the network response was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Return data as JSON
  } catch (error) {
    console.error("Error fetching incomes:", error);
    throw error; // Re-throw to allow component to handle
  }
}

// Creates a new income record
export async function createIncome(income) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST', // HTTP POST method for creation
      headers: { 'Content-Type': 'application/json' }, // Specify JSON content
      body: JSON.stringify(income), // Convert income object to JSON string
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Return the created income object
  } catch (error) {
    console.error("Error creating income:", error);
    throw error;
  }
}

// Deletes an income record by its ID
export async function deleteIncome(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' }); // HTTP DELETE method
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response; // Return the response
  } catch (error) {
    console.error(`Error deleting income with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Fetches income statistics for a specified year and month.
 * Builds the URL with query parameters based on filter selections.
 * @param {string | number | 'all'} year - The year to filter by ('all' for no filter).
 * @param {string | number | 'all'} month - The month to filter by ('all' for no filter).
 * @returns {Promise<Object>} Object with total income and total salary income.
 */
export async function getIncomeStats(year, month) {
  try {
    let url = `${API_BASE_URL}/stats`; // Endpoint for statistics
    const params = new URLSearchParams(); // Tool to build URL query parts

    // Add year to params if it's a specific year
    if (year && year !== 'all') {
      params.append('year', year.toString());
    }
    // Add month to params if it's a specific month
    if (month && month !== 'all') {
      const monthNum = parseInt(month, 10); // Convert month to number
      if (!isNaN(monthNum)) { // Only add if it's a valid number
        params.append('month', monthNum.toString());
      }
    }

    // Attach parameters to the URL if any exist
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json(); // Return statistics data
  } catch (error) {
    console.error("Error fetching income statistics:", error);
    throw error;
  }
}
