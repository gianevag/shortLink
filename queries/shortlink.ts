import { ShortLink, ShortLinkFormData, ShortLinkUser, User } from "definitions";
import { sql } from "@vercel/postgres"
import { unstable_noStore as noStore } from 'next/cache';

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

export const updateShortLinkById = async (shortLinkUsers: ShortLinkFormData) => { 
    try {
        await sql`
            UPDATE shortLink_users
            SET original_link = ${shortLinkUsers.originalUrl},
            isActive = ${shortLinkUsers.isActive},
            description = ${shortLinkUsers?.description || ""}
            WHERE id::text = ${shortLinkUsers.id}
        `
    } catch (error) {
        console.error("Error updating short link: ", error)
    }

}



export const getShortLinksByUser = async (user: User) => {
    // no store the data in cache
    noStore()

    try {
        const shortLinks = await sql`
            SELECT shortLink_users.id,
            shortLink.link, 
            shortLink_users.original_link, 
            shortLink_users.isActive, 
            shortLink_users.views,
            shortLink_users.description
            FROM shortLink
            INNER JOIN shortLink_users ON shortLink_users.shortlink_id = shortLink.id
            WHERE shortLink_users.user_id = ${user.id}
        `
        if (shortLinks.rowCount === 0) return

        // mapping
        return shortLinks.rows.map((row): ShortLinkUser => {
            return {
                originalUrl: row.original_link,
                shortUrl: row.link,
                views: row.views,
                isActive: row.isactive,
                description: row.description,
                shortLinkUsersId: row.id
            }
        })

    } catch (error) {
        console.error("Error getting short links: ", error)
    }
}

export const getShortLinkByLink = async (link: string): Promise<ShortLinkUser | undefined> => {
    
    // no store the data in cache
    noStore()

    try {
        const shortLink = await sql`
            SELECT shortLink_users.id,
            shortLink.link, 
            shortLink_users.original_link, 
            shortLink_users.isActive, 
            shortLink_users.views,
            shortLink_users.description
            FROM shortLink
            INNER JOIN shortLink_users ON shortLink_users.shortlink_id = shortLink.id
            WHERE shortLink.link = ${link}
            LIMIT 1
        `
        if (shortLink.rowCount === 0) return

        return {
            originalUrl: shortLink.rows[0].original_link,
            shortUrl: shortLink.rows[0].link,
            views: shortLink.rows[0].views,
            isActive: shortLink.rows[0].isactive,
            description: shortLink.rows[0].description,
            shortLinkUsersId: shortLink.rows[0].id
        }
    } catch (error) {
        console.error("Error getting short link by id: ", error)
    }
}

export const getShortLinkById = async (id: string): Promise<ShortLinkUser | undefined> => {
        
        // no store the data in cache
        noStore()
    
        try {
            const shortLink = await sql`
                SELECT shortLink_users.id,
                shortLink.link, 
                shortLink_users.original_link, 
                shortLink_users.isActive, 
                shortLink_users.views,
                shortLink_users.description
                FROM shortLink
                INNER JOIN shortLink_users ON shortLink_users.shortlink_id = shortLink.id
                WHERE shortLink_users.id::text = ${id}
                LIMIT 1
            `
            if (shortLink.rowCount === 0) return
    
            return {
                originalUrl: shortLink.rows[0].original_link,
                shortUrl: shortLink.rows[0].link,
                views: shortLink.rows[0].views,
                isActive: shortLink.rows[0].isactive,
                description: shortLink.rows[0].description,
                shortLinkUsersId: shortLink.rows[0].id
            }
        } catch (error) {
            console.error("Error getting short link by id: ", error)
        }
}

export const incrementShortLinkViews = async (shortLinkUsers: ShortLinkUser) => {
    try {
        await sql`
            UPDATE shortLink_users
            SET views = ${shortLinkUsers.views + 1}
            WHERE id::text = ${shortLinkUsers.shortLinkUsersId}
        `
    } catch (error) {
        console.error("Error increasing views: ", error)
        throw new Error("Error increasing views")
    }
}

export const deleteShortLinkById = async (id: string) => {
    try {
        await sql`
            DELETE FROM shortLink_users
            WHERE id::text = ${id}
        `
    } catch (error) {
        console.error("Error deleting short link: ", error)
        throw new Error("Error deleting short link")
    }
}

// TESTING FUNCTION
// (async function () {
//     const links = await getShortLinkByLink("e6b1")
//     if (links) {
//         await incrementShortLinkViews(links)
//         const linksNew = await getShortLinkByLink("e6b1")
//         console.log(links, linksNew)
//     }
//  })()