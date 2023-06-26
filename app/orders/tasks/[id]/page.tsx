"use client"

import * as React from 'react';
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import process from "process";

async function fetchTask(accessToken: string, id: number) {
  const response = await fetch(`http://localhost:${process.env.PORT}/api/tasks/` + id, {
    method: "GET",
    headers: {
      authorization: accessToken
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch default values");
  }

  const data = await response.json();
  const {title, ...labels} = await fetchLabels(data.labelId);


  return {
    ...data,
    label: title
  };
}

async function fetchLabels(id: number) {
  const response = await fetch(`http://localhost:${process.env.PORT}/api/labels/` + id);
  if(!response.ok) throw new Error("Failed to fetch labels");

  const data = await response.json();

  return data;
}

export default function TaskViewPage({ params }: { params: { id: number } }) {
  const { data: session } = useSession();
  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    // @ts-ignore
    if (session?.user?.accessToken) {
      // @ts-ignore
      fetchTask(session?.user?.accessToken, params.id)
        .then((data) => {
          setDefaultValues(data);
        })
        .catch((error) => {
          console.error(error);
          // Handle error or show a message to the user
        });
    }
    // @ts-ignore
  }, [session?.user?.accessToken, params.id]);

  return (
    <div className="mx-auto sm:container">
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          <thead>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              Bezeichnung
            </th>
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              Wert
            </th>
          </tr>
          </thead>
          <tbody>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Task ID
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {/*@ts-ignore*/}
              {defaultValues.id}
            </td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Titel
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {/*@ts-ignore*/}
              {defaultValues.title}
            </td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Beschreibung
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {/*@ts-ignore*/}
              {defaultValues.description}
            </td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Status
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {/*@ts-ignore*/}
              {defaultValues.status}
            </td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              Priorität
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {/*@ts-ignore*/}
              {defaultValues.priority}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
