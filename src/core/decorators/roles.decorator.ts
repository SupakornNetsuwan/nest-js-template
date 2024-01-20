import { Reflector } from "@nestjs/core";
import { UserDto } from "../data-access/users.access";

// Using combinated with Guard
export const Roles = Reflector.createDecorator<UserDto["role"][]>();