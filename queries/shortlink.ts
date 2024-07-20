import { ShortLink, ShortLinkUser, User } from "definitions";
import { sql } from "@vercel/postgres"

export const getLastActiveShortLinks = async () => { 
    try {
        const shortLinks = await sql<ShortLink>`
            SELECT shortLink.id, shortLink.link
            FROM shortLink
            LEFT JOIN shortLink_users ON shortLink_users.shortlink_id = shortLink.id
            WHERE shortLink_users.shortlink_id is NULL
            ORDER BY shortLink.created_at DESC
            LIMIT 1;
        `
        return shortLinks.rows[0]
    } catch (error) {
        console.error("Error getting last active short links: ", error)
    }
}

export const createSholtLink = async (originalUrl: string, user: User, isActive: boolean, description?: string) => {
    try {
        const shortLink = await getLastActiveShortLinks()

        await sql`
            INSERT INTO shortLink_users (user_id, shortlink_id, original_link, isActive, description)
            VALUES (${user.id}, ${shortLink?.id}, ${originalUrl}, ${isActive}, ${description})
        `

    } catch (error) {
        console.error("Error creating short link: ", error)
    }

}


export const getShortLinksByUser = async (user: User) => {
    
    try {
        const shortLinks = await sql`
            SELECT shortLink_users.id,
            shortLink.link, 
            shortLink_users.original_link, 
            shortLink_users.isActive, 
            shortLink_users.views
            FROM shortLink
            LEFT JOIN shortLink_users ON shortLink_users.shortlink_id = shortLink.id
            WHERE shortLink_users.user_id = ${user.id}
        `
        // mapping
        return shortLinks.rows.map((row): ShortLinkUser => {
            return {
                originalUrl: row.original_link,
                shortUrl: row.link,
                views: row.views,
                isActive: row.isactive,
                shortLinkUsersId: row.id
            }
        })

    } catch (error) {
        console.error("Error getting short links: ", error)
    }
}

// TESTING FUNCTION
// (async function () {
//     const user = await getUser("gianevag@hotmail.com")
//     const links = await getShortLinksByUser(user)
//     console.log(links)
//  })()