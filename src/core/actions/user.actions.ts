import { prisma } from "@/src/core/utils/prisma"
import UserEntity from "../entities/user.entity"

/**
 * @description Find a user by email. Abstraction of persistent communication layer
 */


export const getUserByEmail = async (email: string): Promise<UserEntity | null> => {
    const prismaUser = await prisma.user.findUnique({ where: { email } })
    if (!prismaUser) return null
    const userEntity = new UserEntity(prismaUser)
    return userEntity
}

/**
 * @description Find all users
 */

export const getAllUsers = async (): Promise<UserEntity[]> => {
    const prismaUsers = await prisma.user.findMany()
    const userEntities = prismaUsers.map(user => new UserEntity(user))
    return userEntities
}
