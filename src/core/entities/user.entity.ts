import { $Enums, User as PrismaUser } from "@prisma/client";
import { NonConfidentialUserDto, UserDto } from "../data-access/users.access";


class UserEntity implements PrismaUser {
    public email: string;
    public firstName: string;
    public lastName: string;
    public userName: string;
    public password: string;
    public role: $Enums.UserRole;
    public createdAt: Date;
    public updatedAt: Date;
    public JWT: string;

    constructor(user: PrismaUser) {
        this.email = user.email
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.password = user.password
        this.userName = user.userName
        this.updatedAt = user.updatedAt
        this.createdAt = user.createdAt
        this.role = user.role
    }

    get getUser(): NonConfidentialUserDto {
        return {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            role: this.role,
        }
    }

    get getUserEntireData(): UserDto {
        return {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            password: this.password,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            role: this.role
        }
    }

    public setJWT(JWT: string) {
        this.JWT = JWT;
    }
}

export default UserEntity