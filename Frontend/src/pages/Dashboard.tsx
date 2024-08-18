import React, { useEffect } from "react";
import usePresentationStore from "../store/presentationStore";
import { DataTable } from "../components/presentationTable/DataTable";
import { Columns } from "../components/presentationTable/Columns";
import { usePresentationHandlers } from "../services/presentationService/presentationHandlers";
import { Button } from "../components/ui/button";
import FormModal from "../components/FormModal/FormModal";

const Dashboard: React.FC = () => {
  const { presentations, loadPresentations } = usePresentationStore();
  const {
    modalOpen,
    modalMode,
    setModalOpen,
    handleCreatePresentation,
    openCreatePresentationModal,
  } = usePresentationHandlers(undefined);

  useEffect(() => {
    loadPresentations();
  }, [loadPresentations]);

  return (
    <div className="dashboard-container table-container">
      <h1>Presentations Dashboard</h1>
      <Button
        style={{ marginBottom: "1em" }}
        onClick={openCreatePresentationModal}
      >
        Create New Presentation
      </Button>
      <DataTable columns={Columns} data={presentations} />
      {modalOpen && (
        <>
          <div className="modal-backdrop fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="modal fixed inset-0 z-50 flex items-center justify-center">
            <FormModal
              mode={modalMode}
              onClose={() => setModalOpen(false)}
              onSubmit={handleCreatePresentation}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
