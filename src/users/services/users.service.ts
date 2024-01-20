import { Injectable, NotFoundException, UsePipes } from '@nestjs/common';
import UserEntity from '@/src/core/entities/user.entity';
// Actions
import * as userActions from '@/src/core/actions/user.actions';

/**
 * This part does dependency injection for "Users controller"
 * 
 * Service is a subset of providers that are instantiated by the Nest IoC container and that can be injected into classes using the @Injectable() decorator.
 * 
 * @description A business layer - It should contain only business logic. It should never access HTTP request objects (req and res) or any global objects such as process.
 */

@Injectable()
export class UsersService {

    public async findAllUsers() {
        const userEntities = await userActions.getAllUsers()

        return userEntities

    }

    public async findUserByEmail(email: string) {
        const user = await userActions.getUserByEmail(email)

        if (!user) throw new NotFoundException("User not found")

        const userEntity = new UserEntity(user)

        return userEntity

    }
}
