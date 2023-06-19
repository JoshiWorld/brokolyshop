import prisma from '@/lib/prisma';
import {Priority, Status} from "@prisma/client";
import {createLabel, getLabelByTitle} from "@/services/label-service";

interface CreateTaskInput {
  title: string;
  description: string;
  priority: Priority;
  termination?: Date;
  status: Status;
  label: string;
}

interface UpdateTaskInput {
  title?: string;
  description?: string;
  priority?: Priority;
  termination?: Date;
  status?: Status;
  label?: string;
}

export async function createTask(task: CreateTaskInput) {
  let label = await getLabelByTitle(task.label);

  if(!label) {
    label = await createLabel({ title: task.label });
  }

  const createdTask = await prisma.task.create({
    data: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      termination: task.termination,
      status: task.status,
      // @ts-ignore
      labelId: label.id
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

export async function updateUser(id: number, updates: UpdateTaskInput) {
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
