"use client";
import InsertJokeForm from "@/app/_components/new-joke/InsertJokeForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
//
export default function NewJoke() {
  //
  return (
    <main className="flex min-h-screen flex-col justify-center pt-5">
      <Link href="/">
        <Button variant={"secondary"} className="absolute left-5 top-5">
          Back to Home
        </Button>
      </Link>
      <InsertJokeForm />
    </main>
  );
}
