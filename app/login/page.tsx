"use client";

import { setCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { LoginSchema } from "@/schemas";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
//
export default function Login() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  //
  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      axios.post(`${process.env.NEXT_PUBLIC_MODERATE_SERVICE}/auth/login`, {
        email,
        password,
      }),
    onSuccess: (res) => {
      toast.success("Login Successful");
      form.reset();

      setCookie("currentUser", res.data.token, {
        maxAge: 60 * 60,
      });

      window.location.href = "/";
    },
    onError: (error: any) => {
      toast.error("Login Failed");
    },
  });
  //
  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    mutate(data);
  };
  //
  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-5">
      <Link href="/">
        <Button variant={"secondary"} className="absolute left-5 top-5">
          Back to Home
        </Button>
      </Link>

      <Card className="w-full shadow-lg md:w-1/2">
        <CardHeader>
          <h1 className="text-center text-4xl font-bold">Login</h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Email"
                          disabled={isPending}
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Password"
                          disabled={isPending}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={isPending} type="submit">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
