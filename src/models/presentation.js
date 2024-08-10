import mongoose from "mongoose";

const slideSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const presentationSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  authors: [String],
  dateOfPublishment: { type: Date, default: Date.now },
  slides: [slideSchema],
});

const Presentation = mongoose.model("Presentation", presentationSchema);

export default Presentation;
