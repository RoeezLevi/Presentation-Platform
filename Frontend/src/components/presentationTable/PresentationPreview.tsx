"use client";

import React, { useEffect, useState, useCallback } from "react";
import usePresentationStore from "../../store/presentationStore";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import FormModal from "./FormModal";

const PresentationPreview: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const {
    currentPresentation,
    loadPresentationByTitle,
    addSlide,
    updateSlide,
  } = usePresentationStore();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create-slide" | "edit-slide">(
    "create-slide"
  );
  const [editSlideIndex, setEditSlideIndex] = useState<number | null>(null);
  const [initialData, setInitialData] = useState<{
    title?: string;
    content?: string;
  }>({});

  // Ensure loadPresentationByTitle is memoized to prevent unnecessary re-renders
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
      setModalOpen(false); // Close the modal after slide creation
    }
  };

  const handleEditSlide = async (data: { title: string; content: string }) => {
    if (currentPresentation && editSlideIndex !== null) {
      await updateSlide(
        currentPresentation.title,
        currentPresentation.slides[editSlideIndex].title,
        data
      );
      setModalOpen(false); // Close the modal after slide editing
    }
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

  if (!currentPresentation) {
    return <div>Loading...</div>;
  }

  const { slides } = currentPresentation;

  return (
    <div>
      <h1>{currentPresentation.title}</h1>

      <Button onClick={openCreateSlideModal}>Create Slide</Button>

      {slides.length > 0 ? (
        <Carousel style={{ overflow: "hidden", width: "100%" }}>
          <CarouselContent
            style={{ display: "flex", transition: "transform 0.5s ease" }}
          >
            {slides.map((slide, index) => (
              <CarouselItem key={index} style={{ flex: "0 0 100%" }}>
                <h3>{slide.title}</h3>
                <p>{slide.content}</p>
                <Button onClick={() => openEditSlideModal(index)}>
                  Edit Slide
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <br />
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p>No slides available.</p>
      )}
      <br />
      <Button onClick={() => navigate("/")}>Back to Dashboard</Button>

      {modalOpen && (
        <FormModal
          mode={modalMode}
          initialData={initialData}
          onClose={() => setModalOpen(false)}
          onSubmit={
            modalMode === "create-slide" ? handleCreateSlide : handleEditSlide
          }
        />
      )}
    </div>
  );
};

export default PresentationPreview;
