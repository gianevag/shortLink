"use server"
import { signIn, signOut } from "@/auth"
import { createUser, getUser } from "@/queries/user"
import { validateSignupForm } from "@/zod/signUp"
import { SignupFormData } from "definitions"
import { AuthError } from "next-auth"

export const signInUser = async (prevState: string | undefined, formdata: FormData) => {
    try {

        // call signIn from next-auth and redirect from here because it not possible to redirect from auth middleware
        await signIn("credentials", { email: formdata.get("email"), password: formdata.get("password"), redirectTo: "/dashboard" })
    } catch (error) {

        if (error instanceof AuthError) {
            if (error.cause?.err?.message) { 
                return error.cause?.err?.message
            }
            return "Something went wrong. Please try again."
        }
        
    throw error;
  }
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

        // Note: you can not redirect from server to client component, 
        // so return a null message in order to redirect from the client
        return {
            message: null
        }

    } catch (error) {
        console.error("Error signing up user: ", error)
        return {
            message: "Something went wrong. Please try again.",
        }
  }
}

export const signOutUser = async () => { 
    await signOut({redirectTo: "/login"})
}