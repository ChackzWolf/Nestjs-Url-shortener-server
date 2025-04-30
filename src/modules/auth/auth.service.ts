import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { TokenDto } from './dtos/token.dto';
import { UserResponseDto } from '../user/dtos/user-response.dto';
import { UserDocument, UserEntity } from 'src/core/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string):Promise <UserDocument | null> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      // const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: UserDocument): Promise<TokenDto> {
    const payload = { email: user.email, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
      userData: user
    };
  }

  async register(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.create(createUserDto);
  }
}