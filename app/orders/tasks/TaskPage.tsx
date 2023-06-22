"use client";

import Image from "next/image"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import { getSession, GetSessionParams } from 'next-auth/react';
import * as process from "process";

// @ts-ignore
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    // Redirect the user or handle the unauthenticated state
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Pass the session data to the component props
  return {
    props: {
      session,
    },
  };
}

// Simulate a database read for tasks.
// @ts-ignore
async function getTasks(accessToken) {
  // const data = await fs.readFile(
  //   path.join(process.cwd(), "app/orders/tasks/data/tasks.json")
  // )

  const res = await fetch(`http://localhost:${process.env.PORT}/api/tasks`, {
    method: 'GET',
    // @ts-ignore
    headers: {
      'Content-Type': 'application/json',
      // @ts-ignore
      authorization: accessToken
    },
  });

  const tasks = await res.json();

  return tasks;
}

export default async function TaskPage(context: GetSessionParams | undefined) {
  const session = await getSession(context);
  // @ts-ignore
  const accessToken = session?.user?.accessToken || "";
  const tasks = await getTasks(accessToken);

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Willkommen zurück!</h2>
            <p className="text-muted-foreground">
              Hier siehst du alle Aufgaben!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
