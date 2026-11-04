import { prisma } from "@/lib/prisma";

export class UserRepositorie {
    static async getUserByEmail( email : string){
        return prisma.user.findUnique({
            where : {
                email : email
            }
        })
    }
}