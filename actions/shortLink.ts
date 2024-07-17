"use server"

import { auth } from '@/auth'
import { createSholtLink } from "@/queries/shortlink"
import { getUser } from "@/queries/user"
import { validateCreateLinkForm } from "@/zod/createLink"
import { CreateLinkFormData } from "definitions"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation';

export const createShortLink = async (formdata: CreateLinkFormData) => {
    
    // validate form data
    const parsedCreateShortLinkForm = validateCreateLinkForm.safeParse(formdata)
    if(!parsedCreateShortLinkForm.success) {
        return {
            error: parsedCreateShortLinkForm.error.flatten().fieldErrors,
            message: "Invalid form data",
        }
    }

    // validate if user exist
    const authUser = await auth()
    const user = await getUser(authUser?.user?.email || "")
    
    if (!user) {
        return {
            error: null,
            message: "User not found"
        }
    }

    try {

    // create short link
    const { originalUrl, isActive, description } = parsedCreateShortLinkForm.data
    await createSholtLink(originalUrl, user, isActive, description)
    
    } catch (error) {
        console.error(`Error creating short link: ${error}`)
        return {
            error: null,
            message: "Something went wrong. Please try again."
        }
    }
    
    revalidatePath("/dashboard")
    redirect("/dashboard")
}