import React, { useEffect, useState } from "react";
import { usePresentationStore } from "../store/presentationStore";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Carousel, CarouselSlide } from "@shadcn/ui";

const PresentationPreview: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const { selectedPresentation, selectPresentation } = usePresentationStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (title) {
      selectPresentation(title);
    }
  }, [title, selectPresentation]);

  if (!selectedPresentation) {
    return <div>Loading...</div>;
  }

  const { slides } = selectedPresentation;

  return (
    <div>
      <h1>{selectedPresentation.title}</h1>
      <p>{selectedPresentation.authors.join(", ")}</p>
      <p>
        {new Date(selectedPresentation.dateOfPublishment).toLocaleDateString()}
      </p>

      {slides.length > 0 ? (
        <Carousel>
          {slides.map((slide, index) => (
            <CarouselSlide key={index}>
              <h3>{slide.title}</h3>
              <p>{slide.content}</p>
            </CarouselSlide>
          ))}
        </Carousel>
      ) : (
        <p>No slides available.</p>
      )}

      <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
    </div>
  );
};

export default PresentationPreview;
