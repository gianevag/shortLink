import { getShortLinkByLink, incrementShortLinkViews } from "@/queries/shortlink"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const shortLinkId = params.id

        // get short link from db
        const shortLink = await getShortLinkByLink(shortLinkId)
    
        if (!shortLink) {
            return Response.json({ message: "Short link not found" }, { status: 404 })
        }

        // check if short link is active
        if (!shortLink.isActive) {
            return Response.json({ message: "Short link is not active" }, { status: 404 })
        }

        // increment views
        await incrementShortLinkViews(shortLink)
        
        return Response.redirect(shortLink.originalUrl)
    } catch (error) {
        console.error("Error getting short link by id: ", error)
        return Response.json({ message: "Something went wrong. Please try again." }, { status: 500 })
    }

}