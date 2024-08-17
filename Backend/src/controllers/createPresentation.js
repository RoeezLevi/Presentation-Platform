import asyncHandler from "express-async-handler";
import Presentation from "../models/presentation.js";

export const createPresentation = asyncHandler(async (req, res) => {
  const presentation = new Presentation(req.body);
  presentation.slides.push({
    title: `Opening: ${presentation.title}`,
    content: `Authors: ${presentation.authors.join(", ")}\nDate: ${
      presentation.dateOfPublishment
    }`,
  });

  await presentation.save();
  res.status(201).send(presentation);
});
