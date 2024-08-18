// src/components/PresentationPreview.tsx
import React, { useEffect } from "react";
import usePresentationStore from "../../store/presentationStore";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselItem } from "@/components/ui/carousel";

const PresentationPreview: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const { currentPresentation, loadPresentationByTitle } =
    usePresentationStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (title) {
      loadPresentationByTitle(title);
    }
  }, [title, loadPresentationByTitle]);

  if (!currentPresentation) {
    return <div>Loading...</div>;
  }

  const { slides } = currentPresentation;

  return (
    <div>
      <h1>{currentPresentation.title}</h1>
      <p>{currentPresentation.authors.join(", ")}</p>
      <p>
        {new Date(currentPresentation.dateOfPublishment).toLocaleDateString()}
      </p>

      {slides.length > 0 ? (
        <Carousel>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <h3>{slide.title}</h3>
              <p>{slide.content}</p>
            </CarouselItem>
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
