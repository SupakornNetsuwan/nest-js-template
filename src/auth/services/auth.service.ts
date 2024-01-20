import { Injectable, UsePipes } from '@nestjs/common';
import { LoginDetailDto, RegisterDetailDto } from '@/src/core/data-access/users.access';
import UserEntity from '@/src/core/entities/user.entity';
// Actions
import * as authAction from "@/src/core/actions/auth.actions"
import { JwtService } from '@nestjs/jwt';


/**
 * @description We made *.service.ts for manage complexity of data transform
 * and validation after communicate with "actions/\*" which is a persistent layer
 */

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    public async login(loginDetail: LoginDetailDto) {

        const userEntiy = await authAction.login(loginDetail)
        const token = await this.jwtService.signAsync(userEntiy.getUser)

        userEntiy.setJWT(token)

        return userEntiy
    }

    public async register(registerDetailDto: RegisterDetailDto): Promise<UserEntity> {

        const userEntiy = await authAction.register(registerDetailDto)

        return userEntiy
    }
}
