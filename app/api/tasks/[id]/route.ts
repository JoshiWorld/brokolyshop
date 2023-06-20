import { Request } from 'next/dist/compiled/@edge-runtime/primitives';
import prisma from '@/lib/prisma';
import {checkJwt} from "@/services/jwt-service";

export async function DELETE(request: Request, {params}:{params:{id:number}}) {
  const accessToken = request.headers.get("authorization");
  if(checkJwt(accessToken)) return null;

  const deletedTask = await prisma.task.delete({
    where: { id: +params.id }
  });

  return new Response(JSON.stringify(deletedTask));
}

export async function GET(request: Request, {params}: {params:{id:number}}) {
  const accessToken = request.headers.get("authorization");
  if(checkJwt(accessToken)) return null;

  const task = await prisma.task.findFirst({
    where: { id: +params.id }
  });

  return new Response(JSON.stringify(task));
}

export async function PUT(request: Request, { params }: { params: { id: number } }) {
  const accessToken = request.headers.get("authorization");
  if (checkJwt(accessToken)) return null;

  const body = await request.json();
  const updatedTask = await prisma.task.update({
    where: { id: +params.id },
    data: {
      title: body.title,
      status: body.status,
      priority: body.priority,
      description: body.description,
      termination: new Date(body.termination), // Assuming `termination` is a string in ISO 8601 format
      label: body.label,
    },
  });

  return new Response(JSON.stringify(updatedTask));
}

