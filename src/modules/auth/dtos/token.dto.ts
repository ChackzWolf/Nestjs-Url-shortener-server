import { ApiProperty } from '@nestjs/swagger';
import { UserDocument, UserEntity } from 'src/core/entities/user.entity';

export class TokenDto {
  @ApiProperty()
  accessToken: string;
  userData: UserDocument
}