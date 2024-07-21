"use server"

import { auth } from '@/auth'
import { createSholtLink, getShortLinksByUser } from "@/queries/shortlink"
import { getUser } from "@/queries/user"
import { validateCreateLinkForm } from "@/zod/createLink"
import { ShortLinkFormData, ShortLinkUserTableData } from "definitions"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation';
import { headers } from 'next/headers'

export const getShortLinks = async () => { 
    const headersList = headers()    
    const baseUrl = headersList.get('x-forwarded-proto') + "://" + headersList.get('host') + "/"

    const authUser = await auth()
    const user = await getUser(authUser?.user?.email || "")
    
    if (!user) {
        throw new Error("User not found")
    }

    try {
        const shortLinks = await getShortLinksByUser(user)
        return shortLinks?.map((item, idx): ShortLinkUserTableData => ({...item, id: idx+1, shortUrl: `${baseUrl}to/${item.shortUrl}`}))
    } catch (error) {
        console.error(`Error getting short links: ${error}`)
        throw new Error("Something went wrong. Please try again.")
    }
    
}

export const createShortLink = async (formdata: ShortLinkFormData) => {
    
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