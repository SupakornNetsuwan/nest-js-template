import { Global, Injectable, Scope } from '@nestjs/common';
import { NonConfidentialUserDto } from '../data-access/users.access';

/**
 * @description This service is a special service (Service works for services). It does not designed to expost for controller,
 * Instead it was for used in services to check a user's right to gain access
 */

@Injectable({ scope: Scope.REQUEST })
export class JWTService {

    private token: string | null = null;
    private data: NonConfidentialUserDto | null = null;

    constructor() { }

    public set setToken(token: string) {
        this.token = token
    }

    public set setData(data: NonConfidentialUserDto) {
        this.data = data;
    }

    public get getToken() {
        return this.token
    }

    public get getData() {
        return this.data
    }
}
