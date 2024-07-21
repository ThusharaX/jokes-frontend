// Show a list of jokes that the users have submitted

import { Button } from "@/components/ui/button";
import Link from "next/link";

// ! Moderator must be logged in to view this page
export default function SubmittedJokes() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-5">
      <Link href="/">
        <Button variant={"secondary"} className="absolute top-5 left-5">
          Back to Home
        </Button>
      </Link>

      <h1 className="text-4xl font-bold">Submitted Jokes</h1>

      {/* request a new joke from "Submit Jokes" microservice */}

      {/* Display the requested joke */}

      {/* Ability to edit / change the type of joke and approve / reject the joke */}

      {/* Request another joke button */}
    </main>
  );
}
