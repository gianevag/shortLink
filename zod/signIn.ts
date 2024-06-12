import { z } from "zod";

export const signInFormData = z.object({ email: z.string().email(), password: z.string().min(5) })