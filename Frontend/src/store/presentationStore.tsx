import create from "zustand";
import {
  fetchPresentations,
  fetchPresentationByTitle,
  createPresentation as apiCreatePresentation,
  deletePresentation as apiDeletePresentation,
  addSlideToPresentation,
  updateSlideInPresentation,
  deleteSlideFromPresentation,
} from "../services/presentationService";

import type { Presentation, Slide } from "./types";

interface State {
  presentations: Presentation[];
  currentPresentation: Presentation | null;
  loadPresentations: () => Promise<void>;
  loadPresentationByTitle: (title: string) => Promise<void>;
  createPresentation: (presentation: Presentation) => Promise<void>;
  deletePresentation: (title: string) => Promise<void>;
  addSlide: (title: string, slide: Slide) => Promise<void>;
  updateSlide: (
    title: string,
    slideTitle: string,
    slide: Slide
  ) => Promise<void>;
  removeSlide: (title: string, slideTitle: string) => Promise<void>;
}

const usePresentationStore = create<State>((set) => ({
  presentations: [],
  currentPresentation: null,
  loadPresentations: async () => {
    try {
      const presentations = await fetchPresentations();
      set({ presentations });
    } catch (error) {
      console.error("Failed to load presentations:", error);
    }
  },
  loadPresentationByTitle: async (title: string) => {
    try {
      const presentation = await fetchPresentationByTitle(title);
      set({ currentPresentation: presentation });
    } catch (error) {
      console.error("Failed to load presentation by title:", error);
    }
  },
  createPresentation: async (presentation: Presentation) => {
    try {
      await apiCreatePresentation(presentation);
      await usePresentationStore.getState().loadPresentations();
    } catch (error) {
      console.error("Failed to create presentation:", error);
    }
  },
  deletePresentation: async (title: string) => {
    try {
      await apiDeletePresentation(title);
      await usePresentationStore.getState().loadPresentations();
    } catch (error) {
      console.error("Failed to delete presentation:", error);
    }
  },
  addSlide: async (title: string, slide: Slide) => {
    try {
      await addSlideToPresentation(title, slide);
      await usePresentationStore.getState().loadPresentationByTitle(title);
    } catch (error) {
      console.error("Failed to add slide:", error);
    }
  },
  updateSlide: async (title: string, slideTitle: string, slide: Slide) => {
    try {
      await updateSlideInPresentation(title, slideTitle, slide);
      await usePresentationStore.getState().loadPresentationByTitle(title);
    } catch (error) {
      console.error("Failed to update slide:", error);
    }
  },
  removeSlide: async (title: string, slideTitle: string) => {
    try {
      await deleteSlideFromPresentation(title, slideTitle);
      await usePresentationStore.getState().loadPresentationByTitle(title);
    } catch (error) {
      console.error("Failed to remove slide:", error);
    }
  },
}));

export default usePresentationStore;
