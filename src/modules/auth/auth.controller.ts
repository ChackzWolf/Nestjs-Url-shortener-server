import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserResponseDto } from '../user/dtos/user-response.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { TokenDto } from './dtos/token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.authService.register(createUserDto);
  }

  @ApiOperation({ summary: 'Login with credentials' })
  @ApiResponse({ status: 200, type: TokenDto })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Body() loginDto: LoginDto): Promise<TokenDto> {
    return this.authService.login(req.user);
  }
}