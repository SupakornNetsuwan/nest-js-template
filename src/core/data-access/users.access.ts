import { z } from "zod";
import { Prisma, User, UserRole } from "@prisma/client";

export type UserDto = User

export type NonConfidentialUserDto = Prisma.UserGetPayload<{
    select: {
        email: true,
        firstName: true,
        lastName: true,
        userName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
    }
}>

export const registerUserSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Email is not valid" }),
    firstName: z.string({ required_error: "First Name is required" }),
    lastName: z.string({ required_error: "Last Name is required" }),
    userName: z.string({ required_error: "Username is required" }),
    password: z.string({ required_error: "Password is required" }),
    role: z.nativeEnum(UserRole).default("EDITOR").optional()
})

export type RegisterDetailDto = z.infer<typeof registerUserSchema>

export const loginUserSchema = z.object({
    email: z.string({ required_error: "Email is requried" }),
    password: z.string({ required_error: "Password is required" })
})

export type LoginDetailDto = z.infer<typeof loginUserSchema>