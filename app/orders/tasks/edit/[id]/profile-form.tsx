"use client"

import { useSession } from "next-auth/react";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod"
import {Controller, useFieldArray, useForm} from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form"
import process from "process";
import {useEffect, useState} from "react";
import {log} from "next/dist/server/typescript/utils";

const profileFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    }),
  status: z
    .string()
    .min(2, {
      message: "Status must be at least 2 characters.",
    }),
  priority: z
    .string()
    .min(2, {
      message: "Priority must be at least 2 characters.",
    }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    }),
  label: z
    .array(
      z.object({
        value: z.string().min(2, { message: "Please enter a valid tag." }),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>


async function fetchDefaultValues(accessToken: string, id: number) {
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


export function ProfileForm(id: number) {
  const { data: session } = useSession();
  const [defaultValues, setDefaultValues] = useState<Partial<ProfileFormValues>>({});

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    // @ts-ignore
    if (session?.user?.accessToken) {
      // @ts-ignore
      fetchDefaultValues(session?.user?.accessToken)
        .then((data) => {
          setDefaultValues(data);
        })
        .catch((error) => {
          console.error(error);
          // Handle error or show a message to the user
        });
    }

    form.setValue("priority", defaultValues.priority || "");
    // @ts-ignore
  }, [session?.user?.accessToken, defaultValues.priority, form]);

  // const { fields, append } = useFieldArray({
  //   name: "urls",
  //   control: form.control,
  // });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {defaultValues && (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input defaultValue={defaultValues.title} {...field} />
                  </FormControl>
                  <FormDescription>
                    Titel der Aufgabe
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priorität</FormLabel>
                  <Controller
                    control={form.control}
                    name="priority"
                    defaultValue={defaultValues.priority || ""}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Priorität festlegen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="LOW">Low</SelectItem>
                          <SelectItem value="MEDIUM">Medium</SelectItem>
                          <SelectItem value="HIGH">High</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FormDescription>
                    Lege die Priorität fest
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={defaultValues.status}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status festlegen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="TODO">Todo</SelectItem>
                      <SelectItem value="INPROGRESS">In Progress</SelectItem>
                      <SelectItem value="DONE">Done</SelectItem>
                      <SelectItem value="CANCELED">Canceled</SelectItem>
                      <SelectItem value="BACKLOG">Backlog</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Lege den aktuellen Status fest
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beschreibung</FormLabel>
                  <FormControl>
                    <Textarea
                      defaultValue={defaultValues.description}
                      placeholder="Aufgabenbeschreibung"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Die Aufgabe im Detail beschrieben
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {/*{fields.map((field, index) => (*/}
              {/*  <FormField*/}
              {/*    control={form.control}*/}
              {/*    key={field.id}*/}
              {/*    name={`tags.${index}.value`}*/}
              {/*    render={({ field }) => (*/}
              {/*      <FormItem>*/}
              {/*        <FormLabel className={cn(index !== 0 && "sr-only")}>*/}
              {/*          Tags*/}
              {/*        </FormLabel>*/}
              {/*        <FormDescription className={cn(index !== 0 && "sr-only")}>*/}
              {/*          Füge weitere Tags hinzu*/}
              {/*        </FormDescription>*/}
              {/*        <FormControl>*/}
              {/*          <Input {...field} />*/}
              {/*        </FormControl>*/}
              {/*        <FormMessage />*/}
              {/*      </FormItem>*/}
              {/*    )}*/}
              {/*  />*/}
              {/*))}*/}
              {/*<Button*/}
              {/*  type="button"*/}
              {/*  variant="link"*/}
              {/*  size="sm"*/}
              {/*  className="mt-1"*/}
              {/*  onClick={() => append({ value: "" })}*/}
              {/*>*/}
              {/*  Add Tag*/}
              {/*</Button>*/}
            </div>
            <Button type="submit">Speichern</Button>
          </>
        )}
      </form>
    </Form>
  );

}
