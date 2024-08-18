import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
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
    <Modal>
      <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
          {mode === "create-presentation" && "Create Presentation"}
          {mode === "edit-slide" && "Edit Slide"}
          {mode === "create-slide" && "Create Slide"}
        </span>
        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            {(mode === "create-presentation" ||
              mode === "edit-slide" ||
              mode === "create-slide") && (
              <div>
                <label htmlFor="title">Title:</label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            )}

            {mode === "create-presentation" && (
              <div>
                <label htmlFor="authors">Authors (comma separated):</label>
                <Input
                  id="authors"
                  value={authors}
                  onChange={(e) => setAuthors(e.target.value)}
                  required
                />
              </div>
            )}

            {(mode === "edit-slide" || mode === "create-slide") && (
              <div>
                <label htmlFor="content">Content:</label>
                <Input
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
            )}

            <Button type="submit">
              {mode === "create-presentation" && "Create Presentation"}
              {mode === "edit-slide" && "Save Changes"}
              {mode === "create-slide" && "Create Slide"}
            </Button>
          </form>
        </ModalContent>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default FormModal;
