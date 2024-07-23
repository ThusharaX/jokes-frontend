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
import { Skeleton } from "@/components/ui/skeleton";
import { useJokeTypeData } from "@/hooks/use-joke-type-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModeratedJokeData } from "@/hooks/use-joke-data";
import { useJokeTypeStore } from "@/store/useJokeTypeStore";
//
export default function Home() {
  const { data: jokeTypes, isLoading: jokeTypesLoading } = useJokeTypeData();
  const {
    data: moderatedJoke,
    isLoading: moderatedJokesLoading,
    refetch: refetchJoke,
    isFetching: isFetchingJoke,
  } = useModeratedJokeData();
  //
  const { jokeType, setJokeType } = useJokeTypeStore((state) => ({
    jokeType: state.jokeType,
    setJokeType: state.setJokeType,
  }));
  //
  const handleRequestJoke = async () => {
    // Refetch a new random joke
    refetchJoke();
  };
  //
  const handleSelectJokeType = (type: string) => {
    setJokeType(type);
  };
  //
  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-5">
      <Link href="/submitted-jokes">
        <Button variant={"default"} className="absolute right-5 top-5">
          Moderate
        </Button>
      </Link>

      <h1 className="text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-center text-5xl font-bold text-transparent">
        Welcome to JokeHub!
      </h1>

      {moderatedJoke ? (
        <Card className="mt-10 w-full shadow-lg lg:w-1/2">
          <CardHeader>
            <CardTitle className="font-bold">
              {moderatedJokesLoading || isFetchingJoke ? (
                <Skeleton className="h-7 w-full" />
              ) : (
                moderatedJoke?.setup
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {moderatedJokesLoading || isFetchingJoke ? (
              <Skeleton className="h-6 w-1/2" />
            ) : (
              <CardDescription className="text-lg">
                {moderatedJoke?.punchline}
              </CardDescription>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Badge variant={"outline"}>
              {moderatedJokesLoading || isFetchingJoke ? (
                <Skeleton className="h-4 w-16" />
              ) : (
                moderatedJoke?.type
              )}
            </Badge>
            <span className="text-sm text-gray-500">
              {moderatedJokesLoading || isFetchingJoke ? (
                <Skeleton className="h-4 w-16" />
              ) : (
                "by " + moderatedJoke?.author
              )}
            </span>
          </CardFooter>
        </Card>
      ) : (
        <Card className="mt-10 w-full shadow-lg lg:w-1/2">
          <CardHeader>
            <CardTitle className="text-center font-bold">
              Sorry, ☹️ no joke available!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-lg">
              Please select a different joke type or try again later.
            </CardDescription>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col space-x-5 sm:flex-row">
        <div className="flex justify-center gap-5">
          <div className="mt-5">
            {jokeTypesLoading ? (
              <Skeleton className="h-10 w-40" />
            ) : (
              <Select
                defaultValue={jokeType}
                onValueChange={handleSelectJokeType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select joke type" />
                </SelectTrigger>
                <SelectContent>
                  {jokeTypes?.map((type: any) => (
                    <SelectItem key={type.id} value={type.name}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <Button
            className="mt-5"
            onClick={handleRequestJoke}
            disabled={moderatedJokesLoading || jokeTypesLoading}
          >
            Request a random joke
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Link href="/new-joke">
            <Button variant={"secondary"} className="mt-5">
              Submit a new joke
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
