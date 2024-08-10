import { findPresentationByTitle } from "../utils/Utils.js";
import asyncHandler from "express-async-handler";

export const alterPresentationSlide = asyncHandler(async (req, res) => {
  const presentation = await findPresentationByTitle(req.params.title);
  if (!presentation) {
    return res.status(404).send({ error: "Presentation not found" });
  }

  const slide = presentation.slides.filter(
    (slide) => slide.title === req.params.slideTitle
  );
  if (!slide) {
    return res.status(404).send({ error: "Slide not found" });
  }
  slide[0].content = req.body.content;
  slide[0].title = req.body.title;
  await presentation.save();
  return res.send(presentation);
});
