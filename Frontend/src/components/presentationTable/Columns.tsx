"use client";

import { Presentation } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const Columns: ColumnDef<Presentation>[] = [
  {
    accessorKey: "title",
    header: "title",
  },
  {
    accessorKey: "authors",
    header: "authors",
  },
  {
    accessorKey: "dateOfPublishment",
    header: "date Of Publishment",
  },
];
