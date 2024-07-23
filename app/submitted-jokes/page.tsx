"use client";
//
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSubmittedJokeData } from "@/hooks/use-submitted-joke-data";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditJokeSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useJokeTypeData } from "@/hooks/use-joke-type-data";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { deleteCookie } from "cookies-next";
import axiosInstance from "@/lib/axiosInstance";
//
interface Joke {
  _id: number;
  setup: string;
  punchline: string;
  type: string;
  author: string;
}
//
export default function SubmittedJokes() {
  const {
    data: submittedJokes,
    isLoading: isSubmittedJokesLoading,
    refetch: refetchSubmittedJokes,
  } = useSubmittedJokeData();
  //
  const { mutate: approveJokeMutation, isPending: isApprovingJoke } =
    useMutation({
      mutationFn: ({
        _id,
        setup,
        punchline,
        type,
        author,
      }: {
        _id: number;
        setup: string;
        punchline: string;
        type: string;
        author: string;
      }) =>
        axiosInstance.post(
          `${process.env.NEXT_PUBLIC_MODERATE_SERVICE}/jokes/approve/${_id}`,
          {
            setup,
            punchline,
            type,
            author,
          },
        ),
      onSuccess: () => {
        toast.success("Joke Approved Successfully");
        refetchSubmittedJokes();
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  //
  const { mutate: rejectJokeMutation, isPending: isRejectingJoke } =
    useMutation({
      mutationFn: ({ _id }: { _id: number }) =>
        axiosInstance.delete(
          `${process.env.NEXT_PUBLIC_MODERATE_SERVICE}/jokes/reject/${_id}`,
        ),
      onSuccess: () => {
        toast.success("Joke Rejected Successfully");
        refetchSubmittedJokes();
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  //
  const handleApproveJoke = (joke: Joke) => {
    approveJokeMutation(joke);
  };
  //
  const handleRejectJoke = (joke: Joke) => {
    rejectJokeMutation(joke);
  };
  //
  const handleLogout = () => {
    // remove token from cookies
    deleteCookie("currentUser");
    // redirect to login page
    window.location.href = "/";
  };
  //
  return (
    <main className="flex min-h-screen flex-col justify-center pt-5">
      <Link href="/">
        <Button variant={"secondary"} className="absolute left-5 top-5">
          Back to Home
        </Button>
      </Link>

      <Button
        variant={"destructive"}
        className="absolute right-5 top-5"
        onClick={handleLogout}
      >
        Logout
      </Button>

      <h1 className="mt-16 text-center text-4xl font-bold md:mt-5">
        Submitted Jokes
      </h1>

      <div className="mb-10 mt-10 w-full rounded-lg border border-gray-300 bg-white p-4 shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Setup</TableHead>
              <TableHead className="w-[100px]">Punchline</TableHead>
              <TableHead className="w-[100px]">Author</TableHead>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submittedJokes &&
              submittedJokes.map((item: Joke, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.setup}</TableCell>
                  <TableCell>{item.punchline}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    <div className="flex w-full justify-center space-x-2">
                      <ApproveDialog
                        joke={item}
                        onApprove={handleApproveJoke}
                      />
                      <RejectDialog joke={item} onReject={handleRejectJoke} />
                      <EditDialog joke={item} refetch={refetchSubmittedJokes} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

// reject dialog
const RejectDialog = ({ joke, onReject }: { joke: Joke; onReject: any }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">Reject</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reject Joke Confirmation</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Are you sure you want to reject this joke? It will be removed from the
          database.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>No, take me back</AlertDialogCancel>
          <AlertDialogAction onClick={() => onReject(joke)}>
            Yes, reject joke
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Approve Dialog
const ApproveDialog = ({ joke, onApprove }: { joke: Joke; onApprove: any }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="default">Approve</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve Joke Confirmation</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Are you sure you want to approve this joke? It will visible to public.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>No, take me back</AlertDialogCancel>
          <AlertDialogAction onClick={() => onApprove(joke)}>
            Yes, approve joke
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Edit Dialog
const EditDialog = ({ joke, refetch }: { joke: Joke; refetch: any }) => {
  const { data: jokeTypes, isLoading } = useJokeTypeData();
  //
  const form = useForm<z.infer<typeof EditJokeSchema>>({
    resolver: zodResolver(EditJokeSchema),
    defaultValues: {
      setup: joke.setup,
      punchline: joke.punchline,
      type: joke.type,
      author: joke.author,
    },
  });
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
      axiosInstance.patch(
        `${process.env.NEXT_PUBLIC_MODERATE_SERVICE}/jokes/submitted/${joke._id}`,
        {
          setup,
          punchline,
          type,
          author,
        },
      ),
    onSuccess: () => {
      toast.success("Joke Edited Successfully");
      refetch();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
  //
  const onSubmit = (values: z.infer<typeof EditJokeSchema>) => {
    mutate(values);
  };
  //
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Joke</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
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
                <DialogTrigger asChild>
                  <Button disabled={isLoading || isPending} type="submit">
                    Submit Joke
                  </Button>
                </DialogTrigger>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
