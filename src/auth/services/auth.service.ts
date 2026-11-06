import { AuthCredentials } from "@/types/auth.type";
import { AuthProvider } from "../contracts/auth-provider";

export class AuthService {
    constructor(
        private readonly provider: AuthProvider
    ) { }

    async login(credentials: AuthCredentials) {
        return this.provider.login(credentials)
    }

    async getCurrentUser() {
        return this.provider.getUser()
    }

    async logout() {
        return this.provider.logout()
    }
}