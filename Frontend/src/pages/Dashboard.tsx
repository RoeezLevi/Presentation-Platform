import React, { useEffect } from "react";
import usePresentationStore from "../store/presentationStore";
import { DataTable } from "../components/presentationTable/DataTable";
import { Columns } from "../components/presentationTable/Columns";

const Dashboard: React.FC = () => {
  const { presentations, loadPresentations } = usePresentationStore(); // Fetch from Zustand store

  useEffect(() => {
    loadPresentations(); // Call the function from Zustand store
  }, [loadPresentations]);

  console.log("Presentations:", presentations);

  return (
    <div>
      <h1>Presentations Dashboard</h1>
      <DataTable columns={Columns} data={presentations} />
    </div>
  );
};

export default Dashboard;
