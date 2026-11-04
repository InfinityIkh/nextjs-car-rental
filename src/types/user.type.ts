export type UserType = {
    id: number
    username: string
    email: string
    created_At: Date
}

export type UserParams = {
    params: Promise<{ id: string }>
}