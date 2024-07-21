import { z } from "zod";

export const validateShortLinkForm = z.object({
    id: z.string(),
    originalUrl: z.string().url({ message: "Invalid URL" }),
    isActive: z.boolean(),
    description: z.string().max(255),
});

validateShortLinkForm.omit({ id: true });