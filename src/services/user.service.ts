import { prisma } from "@/lib/prisma"
import { UserRepositorie } from "@/repositories/user.repositorie"
import { ServiceResponse } from "@/types/response.type"
import { UserType } from "@/types/user.type"
import type { CreateUserInput, UpdateUserInput } from "@/validation/user.validation"
import bcrypt from "bcryptjs"

export class UserService {
    static async getAll(): ServiceResponse<{ users: UserType[] }> {
        const users = await prisma.user.findMany({
            orderBy: {
                created_At: "desc"
            },
            select: {
                id: true,
                username: true,
                email: true,
                created_At: true
            }
        })
        return {
            data: {
                success: true,
                message: "Users fetched successfully",
                users,
            },
            status: 200
        }
    }

    static async createUser(data: CreateUserInput): ServiceResponse<{ user: UserType }> {
        const { username, email, password }: CreateUserInput = data;
        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await UserRepositorie.getUserByEmail(normalizedEmail)
        if (existingUser) {
            return {
                data: {
                    success: false,
                    message: "validation error",
                    errors: {
                        email: ["User email already exists"],
                    }
                },
                status: 422
            }
        }

        const passwordHash = await bcrypt.hash(password, 12)
        const createdUser = await prisma.user.create({
            data: {
                username,
                email: normalizedEmail,
                password: passwordHash,
            },
            select: {
                id: true,
                username: true,
                email: true,
                created_At: true
            }
        })
        return {
            data: {
                success: true,
                message: "User created successfully",
                user: createdUser,
            },
            status: 201
        }
    }

    static async updateUser(id: string, data: UpdateUserInput): ServiceResponse<{ updated_user: UserType }> {
        const user = await UserService.getUser(id)
        const userId = Number(id)
        if (!user.data.success) {
            return {
                data: {
                    success: false,
                    message: "validation error",
                    errors: {
                        error: ["user not found"]
                    }
                },
                status: 404
            }
        }

        if (data.email) {
            const finduserEmail = await UserRepositorie.getUserByEmail(data.email)
            if (finduserEmail) {
                return {
                    data: {
                        success: false,
                        message: "validation error",
                        errors: {
                            email: ["email already exists"]
                        }
                    },
                    status: 422
                }
            }
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: data,
            select: {
                id: true,
                username: true,
                email: true,
                created_At: true
            }
        })

        return {
            data: {
                success: true,
                message: "user updated succesfully",
                updated_user: updatedUser
            },
            status: 200
        }

    }

    static async getUser(id: string): ServiceResponse<{ user: UserType }> {
        const userId = Number(id)
        const user = await prisma.user.findUnique(({
            where: {
                id: userId
            },
            select: {
                id: true,
                username: true,
                email: true,
                created_At: true
            }
        }))

        if (!user) {
            return {
                data: {
                    success: false,
                    message: "validation error",
                    errors: {
                        error: ["user not found"]
                    }
                },
                status: 404
            }
        }

        return {
            data: {
                success: true,
                message: "user retrevieid succesfully",
                user
            },
            status: 200
        }
    }

    static async deleteUser(id: string): ServiceResponse<{ user: null }> {
        const user = await UserService.getUser(id)
        if (!user.data.success) {
            return {
                data: {
                    success: false,
                    message: "validation error",
                    errors: {
                        error: ["user not found"]
                    }
                },
                status: 404
            }
        }
        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
        return {
            data: {
                success: true,
                message: "user deleted succesfully",
                user: null
            },
            status: 200
        }
    }
}