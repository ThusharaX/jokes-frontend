"use client";
//
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useJokeTypeData } from "@/hooks/use-joke-type-data";
import { InsertJokeSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
//
export default function InsertJokeForm() {
  const { data: jokeTypes, isLoading } = useJokeTypeData();
  //
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      setup,
      punchline,
      type,
      author,
    }: {
      setup: string;
      punchline: string;
      type: string;
      author: string;
    }) =>
      axios.post(`${process.env.NEXT_PUBLIC_SUBMIT_SERVICE}/jokes`, {
        setup,
        punchline,
        type,
        author,
      }),
    onSuccess: () => {
      toast.success("Joke Submitted Successfully");
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
  //
  const form = useForm<z.infer<typeof InsertJokeSchema>>({
    resolver: zodResolver(InsertJokeSchema),
    defaultValues: {
      setup: "",
      punchline: "",
      type: "",
      author: "",
    },
  });
  //
  const onSubmit = (values: z.infer<typeof InsertJokeSchema>) => {
    mutate(values);
  };
  //
  return (
    <div className="flex justify-center">
      <Card className="w-1/2">
        <CardHeader>
          <h1 className="text-4xl font-bold">Submit a new joke 😋</h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="setup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Setup</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Setup of the joke"
                          disabled={isLoading || isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="punchline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Punchline</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Punchline of the joke"
                          disabled={isLoading || isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      {isLoading ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
                        <Select
                          disabled={isLoading || isPending}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {jokeTypes.map((type: any) => (
                              <SelectItem key={type.id} value={type.name}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Author of the joke"
                          disabled={isLoading || isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={isLoading || isPending} type="submit">
                Submit Joke
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
