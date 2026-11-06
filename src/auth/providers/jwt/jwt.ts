import { SignJWT, jwtVerify } from "jose"

const secret = process.env.JWT_SECRET

if (!secret) {
    throw new Error("JWT_SECRET is not defined")
}

const secretKey = new TextEncoder().encode(secret)

export interface JwtPayload {
    userId: string
    role: string
}

export async function signAccessToken(payload: JwtPayload) {
    return await new SignJWT({
        role: payload.role,
    })
        .setProtectedHeader({ alg: "HS256" })
        .setSubject(payload.userId)
        .setIssuedAt()
        .setExpirationTime("30m")
        .sign(secretKey)
}

export async function verifyAccessToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secretKey, {
            algorithms: ["HS256"],
        })

        return {
            userId: payload.sub,
            role: payload.role,
        }
    } catch {
        return null
    }
}