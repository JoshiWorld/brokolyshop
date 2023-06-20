"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form"
import { Input } from "@/components/ui/input"
import {Controller, useForm} from "react-hook-form";
import process from "process";
import {getSession, GetSessionParams, useSession} from "next-auth/react";
import React from "react";

const fetchTasks = async (id: number, accessToken: string) => {
  try {
    const res = await fetch(`http://localhost:${process.env.PORT}/api/tasks/` + id, {
      method: 'GET',
      // @ts-ignore
      headers: {
        'Content-Type': 'application/json',
        // @ts-ignore
        authorization: accessToken
      },
    });

    if(!res.ok) throw new Error('Failed to fetch task ' + id);

    const tasks = await res.json();

    return tasks;
  } catch (err) {
    console.error(err);
    throw err;
  }
}



const TaskEditPages = React.memo(async ({params}) => {
  const form = useForm();
  const { handleSubmit, control, setValue } = useForm();
  const { data: session } = useSession();
  const [task, setTask] = React.useState(null);

  React.useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const accessToken = session?.user?.accessToken;
        const fetchedTask = await fetchTasks(params.id, accessToken);
        setTask(fetchedTask);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTaskData();
  }, [params.id, session]);

  const onSubmit = (data) => {
    console.log(data);
  };

  React.useEffect(() => {
    if (task) {
      setValue('title', task.title);
      setValue('description', task.description);
      setValue('status', task.status);
      setValue('priority', task.priority);
    }
  }, [task, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid justify-center space-y-8">
      <Controller
        control={control}
        name="title"
        defaultValue={task?.title}
        render={({ field }) => (
          <div>
            <label>Titel</label>
            <input {...field} />
          </div>
        )}
      />

      <Controller
        control={control}
        name="description"
        defaultValue={task?.description}
        render={({ field }) => (
          <div>
            <label>Beschreibung</label>
            <input {...field} />
          </div>
        )}
      />

      <Controller
        control={control}
        name="status"
        defaultValue={task?.status}
        render={({ field }) => (
          <div>
            <label>Status</label>
            <input {...field} />
          </div>
        )}
      />

      <Controller
        control={control}
        name="priority"
        defaultValue={task?.priority}
        render={({ field }) => (
          <div>
            <label>Priorität</label>
            <input {...field} />
          </div>
        )}
      />

      <button type="submit">Submit</button>
    </form>
  );
});



async function TaskEditPage({ params }: { params: { id: number } }, context: GetSessionParams | undefined) {
  const form = useForm();
  const session = await getSession(context);
  // @ts-ignore
  const accessToken = session?.user?.accessToken;
  const task = await fetchTasks(params.id, accessToken);

  // @ts-ignore
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid justify-center space-y-8">
        <FormField
          control={form.control}
          name="title"
          defaultValue={task.title}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titel</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          defaultValue={task.description}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beschreibung</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          defaultValue={task.status}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          defaultValue={task.priority}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priorität</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Du bearbeitest gerade eine Aufgabe
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default TaskEditPage;
