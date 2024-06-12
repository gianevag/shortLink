import { SignupFormData } from "definitions";
import { ZodType, z } from "zod";

export const validateSignupForm: ZodType<SignupFormData> = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" }),
    repeatedPassword: z
      .string()
      .min(5, { message: "Repeated password must be at least 5 characters" }),
  })
  .refine((data) => data.password === data.repeatedPassword, {
    message: "Passwords do not match",
    path: ["repeatedPassword"],
  });
