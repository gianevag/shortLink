import NextAuth, {CredentialsSignin } from "next-auth"
import credentials from "next-auth/providers/credentials"
import { getUser } from "./queries/user";
import { signInFormData } from "./zod/signIn";

export const { signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized: async ({ auth, request: {nextUrl}}) => { 
        const isLoggedIn = !!auth?.user
        const isSignUpPage = nextUrl.pathname.startsWith("/signup")
            
        return isSignUpPage || isLoggedIn;
        }
    },
    session: {
        maxAge: 3*60*60 // expire session in 3 hours
    },
    providers: [
        credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                // there is an issue with webpack and bcrypt so we need to import it here
                // also change the next.config.js to use webpack
                const bcrypt = require("bcrypt");

                const parsedCredentials = signInFormData
                                         .safeParse(credentials)
                
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data
                    const user = await getUser(email)
                    
                    if (!user) {
                        throw new CredentialsSignin("Email not found. Please sign up.");
                    }

                    const comparedPassword = await bcrypt.compare(password, user.password)

                    if (comparedPassword) {
                        return user
                    }
                }
                
                throw new CredentialsSignin("Invalid credentials");
            }
        })
    ],
})