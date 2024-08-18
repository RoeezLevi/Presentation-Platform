// src/components/presentation/PresentationPreview.tsx
"use client";

import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import FormModal from "./FormModal";
import { deleteSlideFromPresentation } from "../../services/presentationService";
import { usePresentationHandlers } from "./presentationHandlers";

const PresentationPreview: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const {
    currentPresentation,
    modalOpen,
    modalMode,
    setModalOpen,
    handleCreateSlide,
    handleEditSlide,
    openCreateSlideModal,
    openEditSlideModal,
    navigate,
  } = usePresentationHandlers(title);

  if (!currentPresentation) {
    return <div>Loading...</div>;
  }

  const { slides } = currentPresentation;

  return (
    <div>
      <h1>{currentPresentation.title}</h1>

      {slides.length > 0 ? (
        <Carousel style={{ overflow: "hidden", width: "100%" }}>
          <CarouselContent
            style={{ display: "flex", transition: "transform 0.5s ease" }}
          >
            {slides.map((slide, index) => (
              <CarouselItem key={index} style={{ flex: "0 0 100%" }}>
                <h3>{slide.title}</h3>
                <p>{slide.content}</p>
                <Button
                  style={{ marginRight: "1em" }}
                  onClick={() => openEditSlideModal(index)}
                >
                  Edit Slide
                </Button>
                <Button
                  onClick={() =>
                    deleteSlideFromPresentation(
                      currentPresentation?.title,
                      currentPresentation?.slides[index].title
                    )
                  }
                >
                  Delete Slide
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <br />
          <CarouselPrevious style={{ marginRight: "1em" }} />
          <CarouselNext />
        </Carousel>
      ) : (
        <p>No slides available.</p>
      )}
      <br />
      <Button style={{ marginRight: "1em" }} onClick={() => navigate("/")}>
        Back to Dashboard
      </Button>

      <Button onClick={openCreateSlideModal}>Create Slide</Button>

      {modalOpen && (
        <>
          <div className="modal-backdrop"></div>
          <div className="modal">
            <FormModal
              mode={modalMode}
              onClose={() => setModalOpen(false)}
              onSubmit={
                modalMode === "create-slide"
                  ? handleCreateSlide
                  : handleEditSlide
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PresentationPreview;
