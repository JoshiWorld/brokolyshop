import { Request } from 'next/dist/compiled/@edge-runtime/primitives';
import prisma from '@/lib/prisma';
import {Priority, Status} from "@prisma/client";
import {createTask} from "@/services/task-service";
import {checkJwt} from "@/services/jwt-service";

export async function GET(request: Request) {
  const accessToken = request.headers.get("authorization");
  if(checkJwt(accessToken)) return null;

  const tasks = await prisma.task.findMany();

  return new Response(JSON.stringify(tasks));
}

interface RequestBody {
  title: string;
  description: string;
  priority: Priority;
  termination?: Date;
  status: Status;
  label: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  try {
    const task = await createTask(body);
    return new Response(JSON.stringify(task));
  } catch (error) {
    console.error('Error creating task:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
