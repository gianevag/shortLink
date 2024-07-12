"use server"

import { auth } from '@/auth'
import { getUser } from "@/queries/user"
import { validateCreateLinkForm } from "@/zod/createLink"
import { CreateLinkFormData } from "definitions"

export const createShortLink = async (formdata: CreateLinkFormData) => {
    try {

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

        // create short link

        return {
            error: null,
            message: null
        }

    } catch (error) {
        console.error(`Error creating short link: ${error}`)
        return {
            error: null,
            message: "Something went wrong. Please try again."
        }
    }
}