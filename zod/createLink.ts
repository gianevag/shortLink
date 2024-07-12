import { z } from "zod";

export const validateCreateLinkForm = z.object({
    originalUrl: z.string().url({ message: "Invalid URL" }),
    isActive: z.boolean(),
    description: z.string().max(255),
});