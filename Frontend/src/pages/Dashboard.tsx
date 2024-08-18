import React, { useEffect } from "react";
import usePresentationStore from "../store/presentationStore";
import { DataTable } from "../components/presentationTable/DataTable";
import { Columns } from "../components/presentationTable/Columns";
//import { usePresentationHandlers } from "../components/presentationTable/presentationHandlers";

const Dashboard: React.FC = () => {
  const { presentations, loadPresentations } = usePresentationStore();

  // const {
  //   currentPresentation,
  //   modalOpen,
  //   modalMode,
  //   setModalOpen,
  //   handleCreatePresentation,
  //   openCreatePresentationModal,
  // } = usePresentationHandlers();

  useEffect(() => {
    loadPresentations();
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
