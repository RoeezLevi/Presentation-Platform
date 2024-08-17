import mongoose from "mongoose";

// Define the slide schema
const slideSchema = new mongoose.Schema({
  title: String,
  content: String,
});


const presentationSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  authors: [String],
  dateOfPublishment: {
    type: String,
    default: function () {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2); 
      return `${day}/${month}/${year}`;
    },
  },
  slides: [slideSchema],
});

const Presentation = mongoose.model("Presentation", presentationSchema);

export default Presentation;
