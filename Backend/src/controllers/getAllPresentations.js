import asyncHandler from "express-async-handler";
import Presentation from "../models/presentation.js";

export const getAllPresentations = asyncHandler(async (req, res) => {
  const presentations = await Presentation.find();
  return res.send(presentations);
});
