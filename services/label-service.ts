import prisma from '@/lib/prisma';
import {Task} from "@prisma/client";

interface CreateLabelInput {
  title: string;
  Task?: Task[];
}

interface UpdateLabelInput {
  title?: string;
  Task?: Task[];
}

export async function createLabel(label: CreateLabelInput) {
  const createdLabel = await prisma.label.create({
    data: {
      title: label.title
    },
  });

  return createdLabel;
}

export async function getLabelById(id: number) {
  const label = await prisma.label.findUnique({
    where: { id },
  });

  return label;
}

export async function getLabelByTitle(title: string) {
  const label = await prisma.label.findFirst({
    // @ts-ignore
    where: {title: title},
  });

  return label;
}

export async function updateLabel(id: number, updates: UpdateLabelInput) {
  const label = await prisma.label.update({
    where: { id },
    // @ts-ignore
    data: updates,
  });

  return label;
}

export async function deleteLabel(id: number) {
  await prisma.label.delete({
    where: { id },
  });
}
