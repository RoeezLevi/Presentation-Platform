"use client";
import { Presentation } from "../../types";
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deletePresentation } from "@/services/presentationService";
import { useNavigate } from "react-router-dom";

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
    enableHiding: false,
    cell: ({ row }) => {
      const presentation = row.original;
      const navigate = useNavigate();
      const handleClick = () => {
        navigate(`/presentations/${presentation.title}`);
      };

      return (
        <div className="border-r border-black px-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only"></span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  deletePresentation(presentation.title);
                }}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleClick}>
                View Presentation
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
