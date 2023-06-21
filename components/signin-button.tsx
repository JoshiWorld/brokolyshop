"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from 'react';
import { signIn } from 'next-auth/react';

export function SignInButton() {
  const username = useRef("");
  const password = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: username.current,
      password: password.current,
      redirect: true,
      callbackUrl: "/"
    });
  }

  return (
    <div className="h-200 flex items-center justify-center">
      <div className="max-w-sm p-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login-Page</CardTitle>
            <CardDescription>
              Deine E-Mail ist gleichzeitig auch dein Benutzername
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" onChange={(e) => (username.current = e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" onChange={(e) => (password.current = e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={onSubmit}>Login</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
