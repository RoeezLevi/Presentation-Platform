import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface FormProps {
  mode: "create-presentation" | "edit-slide" | "create-slide";
  onClose: () => void;
  initialData?: {
    title?: string;
    authors?: string;
    content?: string;
  };
  onSubmit: (data: {
    title: string;
    authors?: string[];
    content?: string;
  }) => Promise<void>;
}

const FormModal: React.FC<FormProps> = ({
  mode,
  onClose,
  initialData = {},
  onSubmit,
}) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [authors, setAuthors] = useState(initialData.authors || "");
  const [content, setContent] = useState(initialData.content || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (mode === "create-presentation" && (!title.trim() || !authors.trim())) ||
      ((mode === "edit-slide" || mode === "create-slide") &&
        (!title.trim() || !content.trim()))
    ) {
      alert("All fields are required.");
      return;
    }

    const formData = {
      title: title.trim(),
      authors: authors
        ? authors.split(",").map((author) => author.trim())
        : undefined,
      content: content.trim(),
    };

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Failed to submit form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        {mode === "create-presentation" && "Create New Presentation"}
        {mode === "edit-slide" && "Edit Slide"}
        {mode === "create-slide" && "Create New Slide"}
      </h2>
      <form onSubmit={handleSubmit}>
        {(mode === "create-presentation" ||
          mode === "edit-slide" ||
          mode === "create-slide") && (
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">
              Title:
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        )}
        {mode === "create-presentation" && (
          <div className="mb-4">
            <label htmlFor="authors" className="block mb-2">
              Authors (comma separated):
            </label>
            <Input
              id="authors"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              required
            />
          </div>
        )}
        {(mode === "edit-slide" || mode === "create-slide") && (
          <div className="mb-4">
            <label htmlFor="content" className="block mb-2">
              Content:
            </label>
            <Input
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
        )}
        <div className="mt-4 flex justify-end space-x-2">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {mode === "create-presentation" && "Create Presentation"}
            {mode === "edit-slide" && "Save Changes"}
            {mode === "create-slide" && "Create Slide"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormModal;
