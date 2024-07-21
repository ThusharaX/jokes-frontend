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
