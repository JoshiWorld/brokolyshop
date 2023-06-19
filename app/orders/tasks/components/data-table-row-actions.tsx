"use client"

import { Row } from "@tanstack/react-table"
import { Copy, MoreHorizontal, Pen, Star, Tags, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { taskSchema } from "../data/schema"
import { useEffect, useState } from 'react';
import { Label } from '@prisma/client';
import process from "process";
import {useSession} from "next-auth/react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);
  const { data: session } = useSession();
  // @ts-ignore
  const accessToken = session?.user?.accessToken;

  const [labels, setLabels] = useState<Label[] | null>(null);

  useEffect(() => {
    // Fetch the label data from the backend API based on the labelId of the row
    const fetchLabels = async () => {
      try {
        const response = await fetch(`http://localhost:${process.env.PORT}/api/labels`);
        const data = await response.json();

        setLabels(data);
      } catch (error) {
        console.error('Error fetching labels:', error);
      }
    };

    fetchLabels();
  }, [row.original]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Make a copy
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Star className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Favorite
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Tags className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Labels
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {labels ? (
              <DropdownMenuRadioGroup value={task.labelId + ""}>
                {labels.map((label) => (
                  <DropdownMenuRadioItem key={label.id} value={label.title}>
                    {label.title}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            ) : (
              <div>Loading labels...</div>
            )}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => fetchTasksDelete(task.labelId, accessToken)}>
          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const fetchTasksDelete = async (labelId: number, accessToken: string) => {
  try {
    const response = await fetch(`http://localhost:${process.env.PORT}/api/tasks/` + labelId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': accessToken,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete task.');
    }
    const isEmptyResponse = response.headers.get('content-length') === '0';

    if (!isEmptyResponse) {
      const data = await response.json();
      console.log(data); // Process the response data if needed
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}
