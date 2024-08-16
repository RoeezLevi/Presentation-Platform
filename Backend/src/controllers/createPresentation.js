import asyncHandler from "express-async-handler";
import Presentation from "../models/presentation.js";

export const createPresentation = asyncHandler(async (req, res) => {
  try {
    const presentation = new Presentation(req.body);
    await presentation.save();
    return res.status(201).send(presentation);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ error: err.message });
    }
    return res.status(500).send({ error: "An unexpected error occurred." });
  }
});
