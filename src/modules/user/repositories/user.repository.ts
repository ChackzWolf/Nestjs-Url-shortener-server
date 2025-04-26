import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../interfaces/user-repository.interface";
import { UserDocument, UserEntity } from "src/core/entities/user.entity";
import { Model } from "mongoose";
import { CreateUserDto } from "../dtos/create-user.dto";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectModel(UserEntity.name)  // Small fix: UserEntity.name not User.name
        private userModel: Model<UserDocument>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }
}