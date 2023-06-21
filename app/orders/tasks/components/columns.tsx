"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { priorities, statuses } from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { useEffect, useState } from 'react';
import { Label } from '@prisma/client';
import process from "process";
import { useRouter } from "next/navigation"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays } from "lucide-react"

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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
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

      const showTask = () => {
        router.push('/orders/tasks/' + row.original.id);
      }

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.title}</Badge>}
          <span
            className="max-w-[500px] cursor-pointer truncate font-medium"
            onClick={showTask}
          >
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">
                  {row.getValue("title")}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{row.getValue("title")}</h4>
                    <p className="text-sm">
                      {row.original.description}
                    </p>
                    <div className="flex items-center pt-2">
                      <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                      {row.original.termination ? (
                        <span className="text-xs text-muted-foreground">
                          Abgabedatum: {new Date(row.original.termination).toLocaleDateString("en-US", {day:'numeric', month:'long', year:'numeric'})}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Abgabedatum: Nicht festgelegt
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </span>
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
