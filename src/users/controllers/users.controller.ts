import { Controller, Get, GoneException, Param, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { AuthorizationGuard } from '@/src/core/guards/authorization.guard';
import { AuthenticationGuard } from '@/src/core/guards/authentication.guard';
import { Roles } from '@/src/core/decorators/roles.decorator';
import { JWTService } from '@/src/core/services/JWT.service';

@Controller('/api/users')
export class UsersController {

    constructor(private usersService: UsersService, private jwtService: JWTService) { }

    @Get()
    @Roles(["EDITOR"])
    @UseGuards(AuthorizationGuard)
    @UseGuards(AuthenticationGuard)
    public async getUsers(@Req() req: Request, @Res() res: Response) {

        const allUsers = await this.usersService.findAllUsers()

        return res.send({ message: "All users successfully retrieved", data: allUsers.map(user => user.getUser) })
    }

    @Get("me")
    @Roles(["EDITOR"])
    @UseGuards(AuthorizationGuard)
    @UseGuards(AuthenticationGuard)
    public async test(@Req() req: Request, @Res() res: Response) {

        res.send({ data: this.jwtService.getData, token: this.jwtService.getToken })
    }

    @Get(":email")
    @Roles(["EDITOR"])
    @UseGuards(AuthorizationGuard)
    @UseGuards(AuthenticationGuard)
    public async getUser(@Req() req: Request, @Res() res: Response, @Param("email") email: string) {

        const userEntity = await this.usersService.findUserByEmail(email)

        return res.send({ message: "User found", data: userEntity.getUser })
    }
}
