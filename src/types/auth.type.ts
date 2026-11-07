export interface AuthUser{
    id : number,
    Role : string
}

export interface AuthCredentials {
    email : string
    password : string
}

export interface AuthResult {
    user : AuthUser
    acccessToken? : string
    refreshToken? : string
}