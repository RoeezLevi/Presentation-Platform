import Presentation from "../models/presentation.js";

export const findPresentationByTitle = async (title) => {
  return await Presentation.findOne({ title });
};
