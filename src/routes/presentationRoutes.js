import express from "express";
import { createPresentation } from "../controllers/createPresentation.js";
import { getPresentationByTitle } from "../controllers/getPresentationByTitle.js";
import { addPresentationSlide } from "../controllers/addPresentationSlide.js";
import { alterPresentationSlide } from "../controllers/alterPresentationSlide.js";
import { alterPresentationAuthors } from "../controllers/alterPresentationAuthors.js";
import { deleteSlide } from "../controllers/deleteSlide.js";
import { deletePresentation } from "../controllers/deletePresentation.js";
import { getAllPresentations } from "../controllers/getAllPresentations.js";

const router = express.Router();

// Route to create a new presentation
router.post("/presentations", createPresentation);

// Route to get a presentation by title
router.get("/presentations/:title", getPresentationByTitle);

// Route to add a slide to a presentation
router.post("/presentations/:title/slides", addPresentationSlide);

// Route to alter a specific slide in a presentation
router.put("/presentations/:title/slides/:slideTitle", alterPresentationSlide);

// Route to alter the authors list of a presentation
router.put("/presentations/:title/authors", alterPresentationAuthors);

// Route to delete a specific slide in a presentation
router.delete("/presentations/:title/slides/:slideTitle", deleteSlide);

// Route to delete a presentation
router.delete("/presentations/:title", deletePresentation);

// Route to get all presentations
router.get("/presentations", getAllPresentations);

export default router;
