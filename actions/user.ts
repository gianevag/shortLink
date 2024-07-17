"use server"
import { signIn, signOut } from "@/auth"
import { createUser, getUser } from "@/queries/user"
import { validateSignupForm } from "@/zod/signUp"
import { SignupFormData } from "definitions"
import { AuthError } from "next-auth"
import { redirect } from 'next/navigation';

export const signInUser = async (prevState: string | undefined, formdata: FormData) => {
    try {

        // call signIn from next-auth and redirect from here because it not possible to redirect from auth middleware:
        // the signIn function redirect implicitly and with this {redict: false} we can control the redirect
        await signIn("credentials", { email: formdata.get("email"), password: formdata.get("password"), redirect: false })
    } catch (error) {

        if (error instanceof AuthError) {
            if (error.cause?.err?.message) { 
                return error.cause?.err?.message
            }
            return "Something went wrong. Please try again."
        }
        
    throw error;
    }

    // redirect execute outside of the try catch block
    // because inside of the function throw an error
    // https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#redirect-function
    redirect("/dashboard")
}

export const signUpUser = async (formdata: SignupFormData) => {
    try {
        // there is an issue with webpack and bcrypt so we need to import it here
        // also change the next.config.js to use webpack
        const bcrypt = require("bcrypt");


        const parsedSignupForm = validateSignupForm.safeParse(formdata)

        // validate the form data
        if (!parsedSignupForm.success) {
            return {
                message: "Invalid form data",
            }
        }

        const { email, password } = parsedSignupForm.data

        // validate if user already exist to db
        const user = await getUser(email)
        if (user) {
            return {
                message: "Email already exists. Please sign in.",
            }
        }

        // create user
        const hashedPassword = await bcrypt.hash(password, 10)
        await createUser(email, hashedPassword)

    } catch (error) {
        console.error("Error signing up user: ", error)
        return {
            message: "Something went wrong. Please try again.",
        }
    }
    redirect("/login")
}

export const signOutUser = async () => { 
    await signOut({redirectTo: "/login"})
}