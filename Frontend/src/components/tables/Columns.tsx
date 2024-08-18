"use client";
import { Presentation } from "../../store/types";
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { deletePresentation } from "@/services/presentationService";
import { useNavigate } from "react-router-dom";

import usePresentationStore from "@/store/presentationStore";

export const Columns: ColumnDef<Presentation>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="border-r border-gray-400 px-2">{row.original.title}</div>
    ),
  },
  {
    accessorKey: "authors",
    header: "Authors",
    cell: ({ row }) => (
      <div className="border-r border-gray-400 px-2">
        {row.original.authors.join(", ")}
      </div>
    ),
  },
  {
    accessorKey: "dateOfPublishment",
    header: "Date of Publishment",
    cell: ({ row }) => {
      const dateString = row.original.dateOfPublishment;
      return <div className="border-r border-gray-400 px-2">{dateString}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const presentation = row.original;
      const navigate = useNavigate();
      const { loadPresentations } = usePresentationStore();
      const handleViewClick = () => {
        navigate(`/presentations/${presentation.title}`);
      };
      const handleDeleteClick = async () => {
        await deletePresentation(presentation.title);
        loadPresentations(); // Reload presentations after deletion
        navigate("/");
      };

      return (
        <div className="flex space-x-2">
          <Button variant="destructive" size="sm" onClick={handleDeleteClick}>
            Delete
          </Button>
          <Button variant="secondary" size="sm" onClick={handleViewClick}>
            View
          </Button>
        </div>
      );
    },
  },
];
