import z from "zod";

export const loginSchema = z.object({
    email : z.email("email address invalid"),
    password : z.string("passowrd field must be required").min(8 ,"password must be at least contain 8 words")
})

export const registerSchema = z.object({
    username: z.string().min(4, "Username must contain at least 4 characters").max(20, "Username must not exceed 20 characters"),
    email : z.email("email address invalid"),
    password : z.string("passowrd field must be required").min(8 ,"password must be at least contain 8 words")
})