import { findPresentationByTitle } from "../utils/Utils.js";
import asyncHandler from "express-async-handler";

export const deletePresentation = asyncHandler(async (req, res) => {
  const title = req.params.title; // Extract title as a string
  const presentation = await findPresentationByTitle(title); // Pass title directly
  if (!presentation) {
    return res.status(404).send({ error: "Presentation not found" });
  }
  await presentation.deleteOne(); // Use deleteOne() method to delete the presentation
  return res.send({ message: "Presentation deleted" });
});
