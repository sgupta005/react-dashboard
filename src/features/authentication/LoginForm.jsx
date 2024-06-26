import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { Input } from "@/ui/shadcn/ui/input";
import { Label } from "@/ui/shadcn/ui/label";
import { useState } from "react";
import { useLogin } from "./useLogin";
import SpinnerMini from "@/ui/SpinnerMini";

export function LoginForm() {
  const [email, setEmail] = useState("shi34@gmail.com");
  const [password, setPassword] = useState("shivam1234");
  const { login, isLoading } = useLogin();

  function handleSubmit() {
    if (!email || !password) return;
    login({ email, password });
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            disabled={isLoading}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            disabled={isLoading}
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Sign In"}
        </Button>
      </CardFooter>
    </Card>
  );
}
