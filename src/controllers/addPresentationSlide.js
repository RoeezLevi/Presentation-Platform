import { findPresentationByTitle } from "../utils/Utils.js";
import asyncHandler from "express-async-handler";

export const addPresentationSlide = asyncHandler(async (req, res) => {
  const presentation = await findPresentationByTitle(req.params.title);
  if (!presentation) {
    return res.status(404).send({ error: "Presentation not found" });
  }

  if (!req.body || typeof req.body !== "object") {
    return res.status(400).send({ error: "Invalid slide data" });
  }

  presentation.slides.push(req.body);
  await presentation.save();
  return res.status(201).send(presentation);
});
