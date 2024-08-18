// src/components/presentation/presentationHandlers.tsx
import usePresentationStore from "../../store/presentationStore";
import { useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { Slide } from "@/types"; // Assuming Slide is defined in this path

export const usePresentationHandlers = (title: string | undefined) => {
  const {
    currentPresentation,
    loadPresentationByTitle,
    addSlide,
    updateSlide,
    createPresentation, // Add createPresentation from the store
  } = usePresentationStore();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<
    "create-slide" | "edit-slide" | "create-presentation"
  >("create-slide");
  const [editSlideIndex, setEditSlideIndex] = useState<number | null>(null);
  const [initialData, setInitialData] = useState<{
    title?: string;
    content?: string;
    description?: string;
    authors?: string[];
    dateOfPublishment?: string;
    slides?: Slide[];
  }>({});

  const loadPresentation = useCallback(() => {
    if (title) {
      loadPresentationByTitle(title);
    }
  }, [title, loadPresentationByTitle]);

  useEffect(() => {
    loadPresentation();
  }, [loadPresentation]);

  const handleCreateSlide = async (data: {
    title: string;
    content: string;
  }) => {
    if (currentPresentation) {
      await addSlide(currentPresentation.title, data);
      setModalOpen(false);
    }
  };

  const handleEditSlide = async (data: { title: string; content: string }) => {
    if (currentPresentation && editSlideIndex !== null) {
      await updateSlide(
        currentPresentation.title,
        currentPresentation.slides[editSlideIndex].title,
        data
      );
      setModalOpen(false);
    }
  };

  const handleCreatePresentation = async (data: {
    title: string;
    description: string;
    authors: string[];
    dateOfPublishment: string;
    slides: Slide[];
  }) => {
    await createPresentation(data);
    setModalOpen(false);
  };

  const openCreateSlideModal = () => {
    setInitialData({});
    setModalMode("create-slide");
    setModalOpen(true);
  };

  const openEditSlideModal = (index: number) => {
    const slide = currentPresentation?.slides[index];
    if (slide) {
      setInitialData({ title: slide.title, content: slide.content });
      setEditSlideIndex(index);
      setModalMode("edit-slide");
      setModalOpen(true);
    }
  };

  const openCreatePresentationModal = () => {
    setInitialData({
      title: "",
      description: "",
      authors: [],
      dateOfPublishment: "",
      slides: [],
    });
    setModalMode("create-presentation");
    setModalOpen(true);
  };

  return {
    currentPresentation,
    modalOpen,
    modalMode,
    initialData,
    setModalOpen,
    handleCreateSlide,
    handleEditSlide,
    handleCreatePresentation,
    openCreateSlideModal,
    openEditSlideModal,
    openCreatePresentationModal,
    navigate,
  };
};
