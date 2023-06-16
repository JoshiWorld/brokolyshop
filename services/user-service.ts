// user-service.ts
import prisma from '@/lib/prisma';
import * as bcrypt from 'bcrypt';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserInput {
  name?: string;
  email?: string;
  password?: string;
}

export async function createUser(user: CreateUserInput) {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const createdUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashedPassword,
    },
  });

  return createdUser;
}

export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
}

export async function updateUser(id: number, updates: UpdateUserInput) {
  const user = await prisma.user.update({
    where: { id },
    data: updates,
  });

  return user;
}

export async function deleteUser(id: number) {
  await prisma.user.delete({
    where: { id },
  });
}
