import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(3, {
    message: " nome obrigatorio",
  }),
  type: z.string().min(3, {
    message: " nome obrigatorio",
  }),
  id: z
    .string()
    .min(1, {
      message: " id obrigatorio",
    })
    .optional(),
});
