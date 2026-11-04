import { z } from "zod"

export const userSchema = z.object({
    username: z.string("user name must be required").min(4, "Username must contain at least 4 characters").max(20, "Username must not exceed 20 characters"),
    email : z.email("email address invalid"),
    password : z.string("passowrd field must be required").min(8 ,"password must be at least contain 8 words")
})

export const updateUserSchema = userSchema.omit({ password : true }).partial()

export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type CreateUserInput = z.infer<typeof userSchema>