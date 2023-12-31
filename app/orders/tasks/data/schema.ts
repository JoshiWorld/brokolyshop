import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
const Label = z.object({
  id: z.number(),
  title: z.string(),
});

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.string(),
  labelId: z.number().optional().nullable(),
  priority: z.string(),
  termination: z.string().optional().nullable(),
});

export type Task = z.infer<typeof taskSchema>
