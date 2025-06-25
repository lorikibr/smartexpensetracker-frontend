import React, { useState } from "react";
import IncomeForm from "../components/IncomeForm";
import IncomeList from "../components/IncomeList";

function IncomePage() {
  // State to trigger a refresh for the IncomeList
  const [refresh, setRefresh] = useState(false);

  // Toggles the refresh state to force IncomeList to update
  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Income</h1>
      {/* Form to add new income, triggers refresh when income is added */}
      <IncomeForm onIncomeAdded={triggerRefresh} />
      {/* Lists all income; 'key' prop forces re-render when 'refresh' changes */}
      <IncomeList key={refresh} />
    </div>
  );
}

export default IncomePage;
