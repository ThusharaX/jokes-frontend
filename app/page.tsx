"use client";
//
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useJokeTypeData } from "@/hooks/use-joke-type-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//
export default function Home() {
  const { data: jokeTypes, isLoading: jokeTypesLoading } = useJokeTypeData();
  //
  // ! Temporary data for testing
  const data = {
    setup: "Why do programmers prefer dark mode?",
    punchline: "Because the light attracts bugs!",
    type: "programming",
    author: "JokeHub",
  };
  //
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJokeType, setSelectedJokeType] = useState("");
  //
  const handleRequestJoke = async () => {
    setIsLoading(true);
    // ! Fetch random joke
    // const response = await fetch("");
    // const joke = await response.json();
    // console.log(joke);
    // wait for 1 second
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };
  //
  const handleSelectJokeType = (type: string) => {
    setSelectedJokeType(type);
  };
  //
  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-5">
      <h1 className="text-center text-5xl font-bold text-gray-800">
        Welcome to JokeHub!
      </h1>

      {/* Joke setup and Punchline */}
      <Card className="mx-auto mt-10 w-1/2 shadow-lg">
        <CardHeader>
          {/* <CardTitle className="font-bold">{data.setup}</CardTitle> */}
          <CardTitle className="font-bold">
            {isLoading ? <Skeleton className="h-7 w-full" /> : data.setup}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg">
            {isLoading ? <Skeleton className="h-6 w-1/2" /> : data.punchline}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Badge variant={"outline"}>
            {isLoading ? <Skeleton className="h-4 w-16" /> : data.type}
          </Badge>
          <span className="text-sm text-gray-500">
            {isLoading ? (
              <Skeleton className="h-4 w-16" />
            ) : (
              "by " + data.author
            )}
          </span>
        </CardFooter>
      </Card>

      <div className="mt-5 flex justify-center gap-5">
        <div className="mt-5">
          {/* Select joke type */}
          {jokeTypesLoading ? (
            <Skeleton className="h-10 w-40" />
          ) : (
            <Select
              defaultValue={selectedJokeType}
              onValueChange={handleSelectJokeType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select joke type" />
              </SelectTrigger>
              <SelectContent>
                {jokeTypes?.map((type: any) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Request random joke button */}
        <Button
          className="mt-5"
          onClick={handleRequestJoke}
          disabled={isLoading || jokeTypesLoading || !selectedJokeType}
        >
          Request a random joke
        </Button>

        {/* Submit a new joke button */}
        <Link href="/new-joke">
          <Button variant={"secondary"} className="mt-5">
            Submit a new joke
          </Button>
        </Link>
      </div>
    </main>
  );
}
