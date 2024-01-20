import { prisma } from "@/src/core/utils/prisma"
import { LoginDetailDto, RegisterDetailDto } from "../data-access/users.access"
import { HttpException, HttpStatus, NotAcceptableException, NotFoundException, ForbiddenException } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import UserEntity from "../entities/user.entity"
import { getUserByEmail } from "./user.actions"

type RegisterFunction = (registerDetailDto: RegisterDetailDto) => Promise<UserEntity>

/**
 * @param registerDetailDto - DTO for register user type
 * @description Register a new user if any error occur will throw an HTTP error
 */

export const register: RegisterFunction = async ({ firstName, lastName, password, userName, email, role }) => {

    const user = await getUserByEmail(email)

    if (user) throw new NotAcceptableException("The following username has been taken")

    const hashedPassword = await bcrypt.hash(password, 10)
    const registerResult = await prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            userName,
            password: hashedPassword,
            role
        }
    })

    return new UserEntity(registerResult)
}



type LoginFunction = ({ email, password }: LoginDetailDto) => Promise<UserEntity>

/**
 * @param LoginDetailDto - DTO for login user type
 * @description Login existed user if valid return user entity
 */

export const login: LoginFunction = async ({ email, password }) => {

    const user = await getUserByEmail(email)

    if (!user) throw new NotFoundException("User with following username was not found")

    const compareResult = await bcrypt.compare(password, user.password)

    if (!compareResult) throw new ForbiddenException("Username as password are not match");

    return user
}