import axios from "axios";
import { Presentation, Slide } from "../../types";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

export const fetchPresentations = async () => {
  const response = await api.get("/presentations");
  return response.data;
};

export const fetchPresentationByTitle = async (title: string) => {
  const response = await api.get(`/presentations/${title}`);
  return response.data;
};

export const createPresentation = async (presentation: Presentation) => {
  const response = await api.post("/presentations", presentation);
  return response.data;
};

export const deletePresentation = async (title: string) => {
  const response = await api.delete(`/presentations/${title}`);
  return response.data;
};

export const addSlideToPresentation = async (title: string, slide: Slide) => {
  const response = await api.post(`/presentations/${title}/slides`, slide);
  return response.data;
};

export const updateSlideInPresentation = async (
  title: string,
  slideTitle: string,
  slide: Slide
) => {
  const response = await api.put(
    `/presentations/${title}/slides/${slideTitle}`,
    slide
  );
  return response.data;
};

export const deleteSlideFromPresentation = async (
  title: string,
  slideTitle: string
) => {
  const response = await api.delete(
    `/presentations/${title}/slides/${slideTitle}`
  );
  return response.data;
};
