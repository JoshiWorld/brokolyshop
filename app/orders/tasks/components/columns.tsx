"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, statuses } from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { Label } from '@prisma/client';
import process from "process";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [label, setLabel] = useState<Label | null>(null);
      // const label = labels.find((label) => label.value === row.original.labelId + "");

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        // Fetch the label data from the backend API based on the labelId of the row
        const fetchLabel = async () => {
          try {
            const response = await fetch(`http://localhost:${process.env.PORT}/api/labels/` + row.original.labelId);
            const data = await response.json();
            setLabel(data);
          } catch (error) {
            console.error('Error fetching label:', error);
          }
        };

        fetchLabel();
      }, [row.original.labelId]);



      const editable = true;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [editing, setEditing] = useState(false);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [inputValue, setInputValue] = useState(row.getValue("title"));

      // @ts-ignore
      const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };

      const handleEditStart = () => {
        setEditing(true);
      };

      const handleEditEnd = () => {
        setEditing(false);
        // Perform any necessary actions with the updated value
        console.log(inputValue);
      };

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.title}</Badge>}
          {editable && editing ? (
            <input
              type="text"
              onChange={handleInputChange}
              onBlur={handleEditEnd}
              className="max-w-[500px] truncate font-medium outline-none border-b"
            />
          ) : (
            <span
              className="max-w-[500px] truncate font-medium cursor-pointer"
              onClick={editable ? handleEditStart : undefined}
            >
        {row.getValue("title")}
      </span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
