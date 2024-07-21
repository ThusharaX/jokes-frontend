import * as z from "zod";
//
export const InsertJokeSchema = z.object({
  setup: z.string().min(1, {
    message: "Setup is required",
  }),
  punchline: z.string().min(1, {
    message: "Punchline is required",
  }),
  type: z.string().min(1, {
    message: "Type is required",
  }),
  author: z.string().min(1, {
    message: "Author is required",
  }),
});
//
export const EditJokeSchema = z.object({
  setup: z.string().min(1, {
    message: "Setup is required",
  }),
  punchline: z.string().min(1, {
    message: "Punchline is required",
  }),
  type: z.string().min(1, {
    message: "Type is required",
  }),
  author: z.string().min(1, {
    message: "Author is required",
  }),
});
//
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});