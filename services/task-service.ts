// user-service.ts
import prisma from '@/lib/prisma';
import { Label, Priority, Status } from '@prisma/client';

interface CreateTaskInput {
  title: string;
  description: string;
  priority: Priority;
  termination?: Date;
  status: Status;
  label: Label;
}

interface UpdateUserInput {
  title?: string;
  description?: string;
  priority?: Priority;
  termination?: Date;
  status?: Status;
  label?: Label;
}

export async function createTask(task: CreateTaskInput) {
  const createdTask = await prisma.task.create({
    data: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      termination: task.termination,
      status: task.status,
      // @ts-ignore
      'label': task.label
    },
  });

  return createdTask;
}

export async function getTaskById(id: number) {
  const task = await prisma.task.findUnique({
    where: { id },
  });

  return task;
}

export async function updateTask(id: number, updates: UpdateUserInput) {
  const task = await prisma.task.update({
    where: { id },
    // @ts-ignore
    data: updates,
  });

  return task;
}

export async function deleteTask(id: number) {
  await prisma.task.delete({
    where: { id },
  });
}
