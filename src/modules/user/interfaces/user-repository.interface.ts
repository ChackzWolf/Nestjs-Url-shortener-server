import { UserEntity } from "src/core/entities/user.entity";
import {CreateUserDto} from "../dtos/create-user.dto";

export interface IUserRepository {
    create(CreateUserDto: CreateUserDto):Promise<UserEntity>;
    findByEmail(email:string):Promise<UserEntity | null>;
    findById(id:string):Promise<UserEntity | null>;
}

