import { AuthCredentials, AuthResult, AuthUser } from "@/types/auth.type"

export interface AuthProvider {
    login(credentials : AuthCredentials): Promise<AuthResult | null>
    getUser(): Promise<AuthUser | null>
    logout(): Promise<void>
}