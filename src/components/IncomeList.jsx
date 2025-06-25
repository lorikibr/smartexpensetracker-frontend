import { useEffect, useState } from "react";
import { getIncomes, deleteIncome } from "../api/IncomeApi";

function IncomeList() {
  // State to store income records
  const [incomes, setIncomes] = useState([]);
  // State for tracking which item is being edited (currently not fully used for income)
  const [editingId, setEditingId] = useState(null);
  // State to hold form data for an item being edited
  const [editForm, setEditForm] = useState({
    source: "",
    amount: "",
    date: "",
  });

  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Function to fetch income data from the API
  const loadIncomes = async () => {
    try {
      const data = await getIncomes();
      setIncomes(data);
    } catch (error) {
      console.error("Error loading incomes:", error);
    }
  };

  // Loads incomes when the component first mounts
  useEffect(() => {
    loadIncomes();
  }, []); // Runs once

  // Handles deleting an income record
  const handleDelete = async (id) => {
    try {
      await deleteIncome(id);
      loadIncomes(); // Reload incomes after deleting
    } catch (error) {
      console.error(`Error deleting income with ID ${id}:`, error);
    }
  };

  // --- Pagination Logic ---
  const totalPages = Math.ceil(incomes.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIncomes = incomes.slice(indexOfFirstItem, indexOfLastItem); // Incomes for the current page

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Your Income Records
      </h2>
      {incomes.length === 0 && !editingId ? (
        // Message shown if there are no income records
        <p className="text-gray-600 text-center py-4">
          No income records available. Add some!
        </p>
      ) : (
        <>
          {/* Table to display income records */}
          <table className="min-w-full text-left border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left border-b border-gray-200">
                  Source
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-200">
                  Amount
                </th>
                <th className="py-3 px-6 text-left border-b border-gray-200">
                  Date
                </th>
                <th className="py-3 px-6 text-center border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentIncomes.map((income) => (
                <tr
                  key={income.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  {/* Source Column */}
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {income.source}
                  </td>
                  {/* Amount Column */}
                  <td className="py-3 px-6 text-left">
                    {income.amount ? income.amount.toFixed(2) : "0.00"} MKD
                  </td>
                  {/* Date Column */}
                  <td className="py-3 px-6 text-left">
                    {income.date ? income.date.slice(0, 10) : "N/A"}{" "}
                  </td>
                  {/* Actions Column */}
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center space-x-3">
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(income.id)}
                        className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && ( // Only shows if there's more than one page
            <div className="mt-4 flex justify-between items-center px-4 py-2 bg-gray-50 rounded-b-lg">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
              >
                Previous
              </button>

              <span className="text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default IncomeList;
