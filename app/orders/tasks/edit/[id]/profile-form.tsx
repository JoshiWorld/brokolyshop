"use client"

import { useSession } from "next-auth/react";
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
import React, {useEffect, useState} from "react";
// @ts-ignore
import { zodResolver } from '@hookform/resolvers/zod';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from 'date-fns';
import { useRouter } from "next/navigation";

const profileFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title must be at least 2 characters.",
    }).optional(),
  status: z
    .string()
    .min(1, {
      message: "Status must be at least 2 characters.",
    }).optional(),
  priority: z
    .string()
    .min(1, {
      message: "Priority must be at least 2 characters.",
    }).optional(),
  description: z
    .string()
    .min(1, {
      message: "Description must be at least 2 characters.",
    }).optional(),
  label: z
    .array(
      z.object({
        value: z.string().min(2, { message: "Please enter a valid tag." }),
      })
    )
    .optional(),
  termination: z.date().optional(),
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


interface ProfileFormProps {
  id: number
}

export default function ProfileForm({ id }: ProfileFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [defaultValues, setDefaultValues] = useState<Partial<ProfileFormValues>>({});
  const [date, setDate] = React.useState<Date>();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    // @ts-ignore
    if (session?.user?.accessToken) {
      // @ts-ignore
      fetchDefaultValues(session?.user?.accessToken, id)
        .then((data) => {
          setDefaultValues(data);
        })
        .catch((error) => {
          console.error(error);
          // Handle error or show a message to the user
        });
    }

    form.setValue("priority", defaultValues.priority || "");
    form.setValue("status", defaultValues.status || "");
    form.setValue("description", defaultValues.description || "");
    form.setValue("termination", defaultValues.termination ? new Date(defaultValues.termination) : undefined);
    // @ts-ignore
    setDate(defaultValues.termination ? new Date(defaultValues.termination) : undefined);
    form.setValue("title", defaultValues.title || "");
    // @ts-ignore
  }, [session?.user?.accessToken, defaultValues.priority, defaultValues.status, defaultValues.description, defaultValues.termination, defaultValues.title, form]);

  function onSubmit(data: ProfileFormValues) {
    const newData = {
      ...data,
      termination: date?.toISOString()
    };

    fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // @ts-ignore
        authorization: session?.user?.accessToken // Replace with your actual access token
      },
      body: JSON.stringify(newData)
    })
      .then(response => response.json())
      .then(updatedTask => {
        // Handle the response from the backend
        console.log("Task updated:", updatedTask);
        // Show success message or perform any other actions
        toast({
          title: "Task updated successfully",
          // Customize the toast message as needed
        });

        router.push("/orders/tasks/");
      })
      .catch(error => {
        // Handle the error
        console.error("Error updating task:", error);
        // Show error message or perform any other error handling
        toast({
          title: "Error updating task",
          description: error.message, // Customize the error message as needed
          // Customize the toast appearance and behavior as needed
        });
      });
  }


  // @ts-ignore
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
                  <Controller
                    control={form.control}
                    name="title"
                    defaultValue={defaultValues.title || ""}
                    render={({ field }) => (
                      <FormControl>
                        <Input defaultValue={defaultValues.title} {...field} />
                      </FormControl>
                    )}
                  />
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
                  <Controller
                    control={form.control}
                    name="status"
                    defaultValue={defaultValues.status || ""}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Status festlegen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="TODO">ToDo</SelectItem>
                          <SelectItem value="INPROGRESS">In Progress</SelectItem>
                          <SelectItem value="DONE">Done</SelectItem>
                          <SelectItem value="CANCELED">Canceled</SelectItem>
                          <SelectItem value="BACKLOG">Backlog</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FormDescription>
                    Lege den Status fest
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
                  <Controller
                    control={form.control}
                    name="description"
                    defaultValue={defaultValues.description || ""}
                    render={({ field }) => (
                      <FormControl>
                        <Textarea
                          defaultValue={defaultValues.description}
                          placeholder="Aufgabenbeschreibung"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                    )}
                  />
                  <FormDescription>
                    Die Aufgabe im Detail beschrieben
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="termination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abgabedatum</FormLabel>
                  <Controller
                    control={form.control}
                    name="termination"
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*<FormField*/}
            {/*  control={form.control}*/}
            {/*  name="termination"*/}
            {/*  render={({ field }) => (*/}
            {/*    <Popover>*/}
            {/*      <PopoverTrigger asChild>*/}
            {/*        <Button*/}
            {/*          variant={"outline"}*/}
            {/*          className={cn(*/}
            {/*            "w-[280px] justify-start text-left font-normal",*/}
            {/*            !date && "text-muted-foreground"*/}
            {/*          )}*/}
            {/*        >*/}
            {/*          <CalendarIcon className="mr-2 h-4 w-4" />*/}
            {/*          {date ? format(date, "PPP") : <span>Pick a date</span>}*/}
            {/*        </Button>*/}
            {/*      </PopoverTrigger>*/}
            {/*      <PopoverContent className="w-auto p-0">*/}
            {/*        <Calendar*/}
            {/*          mode="single"*/}
            {/*          selected={date}*/}
            {/*          onSelect={setDate}*/}
            {/*          initialfocus*/}
            {/*        />*/}
            {/*      </PopoverContent>*/}
            {/*    </Popover>*/}
            {/*    )}*/}
            {/*/>*/}
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
