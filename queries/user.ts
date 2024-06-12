import { sql } from "@vercel/postgres"
import { User } from "definitions"


export const getUser = async (email: string) => {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email = ${email}`
        return user.rows[0]
    } catch (error) { 
        console.error("Error getting user: ", error)
        throw new Error("Error getting user")
    }
}


export const createUser = async (email: string, password: string) => { 
    try {
        const user = await sql<User>`INSERT INTO users (name, email, password) VALUES ('', ${email}, ${password}) RETURNING *`
        return user.rows[0]
    } catch (error) { 
        console.error("Error creating user: ", error)
        throw new Error("Error creating user")
    }

}