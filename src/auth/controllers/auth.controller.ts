import { Body, Controller, Post, Req, Res, UsePipes } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ZodValidationPipe } from '@/src/core/pipes/zod-validation.pipe';
import { LoginDetailDto, loginUserSchema, RegisterDetailDto, registerUserSchema } from '@/src/core/data-access/users.access';

@Controller('/api')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("/register")
    @UsePipes(new ZodValidationPipe(registerUserSchema))
    public async register(@Req() req: Request, @Res() res: Response, @Body() registerDetail: RegisterDetailDto) {

        const userEntiy = await this.authService.register(registerDetail)
        return res.json({ message: "Register succeed", data: userEntiy.getUser })

    }

    @Post("/login")
    @UsePipes(new ZodValidationPipe(loginUserSchema))
    public async login(@Req() req: Request, @Res() res: Response, @Body() loginDetail: LoginDetailDto) {

        const userEntiy = await this.authService.login(loginDetail)
        res.cookie("token", `Bearer ${userEntiy.JWT}`, { secure: true, sameSite: true })
        return res.json({ message: "Login succeed", data: userEntiy.getUser })

    }
}
