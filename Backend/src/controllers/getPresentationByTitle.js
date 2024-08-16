import { findPresentationByTitle } from "../utils/Utils.js";
import asyncHandler from "express-async-handler";

export const getPresentationByTitle = asyncHandler(async (req, res) => {
  const presentation = await findPresentationByTitle(req.params.title);
  if (!presentation) {
    return res.status(404).send({ error: "Presentation not found" });
  }

  return res.send(presentation);
});
