import { findPresentationByTitle } from "../utils/Utils.js";
import asyncHandler from "express-async-handler";

export const alterPresentationAuthors = asyncHandler(async (req, res) => {
  const presentation = await findPresentationByTitle(req.params.title);
  if (!presentation) {
    return res.status(404).send({ error: "Presentation not found" });
  }

  if (!Array.isArray(req.body.authors)) {
    return res.status(400).send({ error: "Authors should be an array" });
  }

  presentation.authors = req.body.authors;
  await presentation.save();
  return res.send(presentation);
});
