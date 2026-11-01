"server-only"

import { cookies } from "next/headers"
import { createHash } from "node:crypto"
import { prisma } from "./prisma"

export async function getCurrentSession(){
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value
    if(!token){
        return null
    }

    const tokenHash = createHash("sha256").update(token).digest("hex")
    const session = await prisma.session.findUnique({
        where : {
            token : tokenHash
        },
        include : {
            user : {
                select : {
                    id : true,
                    username : true,
                    email : true,
                }
            }
        }
    })
    if(!session){
        return null
    }

    if (session.expiresAt <= new Date()){
        await prisma.session.delete({
            where : {
                id : session.id
            }
        })
        return null
    }

    return {
        sessionId : session.id,
        expiresAt : session.expiresAt,
        user : session.user
    }
}