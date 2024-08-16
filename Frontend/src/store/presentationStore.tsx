// src/store/presentationStore.ts
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

import type { Presentation, Slide } from "../types";



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
    const presentations = await fetchPresentations();
    set({ presentations });
  },

  loadPresentationByTitle: async (title: string) => {
    const presentation = await fetchPresentationByTitle(title);
    set({ currentPresentation: presentation });
  },

  createPresentation: async (presentation: Presentation) => {
    const newPresentation = await apiCreatePresentation(presentation);
    set((state) => ({
      presentations: [...state.presentations, newPresentation],
    }));
  },

  deletePresentation: async (title: string) => {
    await apiDeletePresentation(title);
    set((state) => ({
      presentations: state.presentations.filter((p) => p.title !== title),
    }));
  },

  addSlide: async (title: string, slide: Slide) => {
    const updatedPresentation = await addSlideToPresentation(title, slide);
    set({ currentPresentation: updatedPresentation });
  },

  updateSlide: async (title: string, slideTitle: string, slide: Slide) => {
    const updatedPresentation = await updateSlideInPresentation(
      title,
      slideTitle,
      slide
    );
    set({ currentPresentation: updatedPresentation });
  },

  removeSlide: async (title: string, slideTitle: string) => {
    const updatedPresentation = await deleteSlideFromPresentation(
      title,
      slideTitle
    );
    set({ currentPresentation: updatedPresentation });
  },
}));

export default usePresentationStore;
