import * as z from "zod";

export const UnitSchema = z.object({
  name: z.string().min(2, { message: "name must be at least 2 characters." }),
  lead: z.string().min(2, { message: "lead must be provided." }),
});
