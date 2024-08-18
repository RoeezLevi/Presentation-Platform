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
    createPresentation,
    loadPresentations,
  } = usePresentationStore();

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<
    "create-slide" | "edit-slide" | "create-presentation" | null
  >(null);

  const [editSlideIndex, setEditSlideIndex] = useState<number | null>(null);

  const [initialData, setInitialData] = useState<{
    title?: string;
    content?: string;
    description?: string;
    authors?: string[];
    dateOfPublishment?: string;
    slides?: Slide[];
  }>({});

  // Load the presentation by title (if provided)
  const loadPresentation = useCallback(() => {
    if (title) {
      loadPresentationByTitle(title);
    }
  }, [title, loadPresentationByTitle]);

  useEffect(() => {
    loadPresentation();
  }, [loadPresentation]);

  // Handle creating a new slide
  const handleCreateSlide = async (data: {
    title: string;
    content: string;
  }) => {
    if (currentPresentation) {
      await addSlide(currentPresentation.title, data);
      setModalOpen(false);
    }
  };

  // Handle editing an existing slide
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

  // Handle creating a new presentation
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

  // Open the modal for creating a new slide
  const openCreateSlideModal = () => {
    setInitialData({});
    setModalMode("create-slide");
    setModalOpen(true);
  };

  // Open the modal for editing an existing slide
  const openEditSlideModal = (index: number) => {
    const slide = currentPresentation?.slides[index];
    if (slide) {
      setInitialData({ title: slide.title, content: slide.content });
      setEditSlideIndex(index);
      setModalMode("edit-slide");
      setModalOpen(true);
    }
  };

  // Open the modal for creating a new presentation
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
    loadPresentations,
    handleEditSlide,
    handleCreatePresentation,
    openCreateSlideModal,
    openEditSlideModal,
    openCreatePresentationModal,
    navigate,
  };
};
