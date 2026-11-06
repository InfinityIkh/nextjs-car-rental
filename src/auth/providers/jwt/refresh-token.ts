import { createHash, randomBytes } from "node:crypto";

export function generateRefreshToken() {
    return randomBytes(32).toString("hex")
}

export function hashRefreshToken(token : string) {
    return createHash("sha256").update(token).digest("hex")
}