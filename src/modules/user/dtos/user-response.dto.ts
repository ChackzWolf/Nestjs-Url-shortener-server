import { ApiProperty } from "@nestjs/swagger";
import  {Exclude, Expose} from 'class-transformer'

@Exclude()
export class UserResponseDto {
    @Expose()
    @ApiProperty()
    id:string;

    @Expose()
    @ApiProperty()
    email:string;

    @Expose()
    @ApiProperty()
    name:string;

    @Expose()
    @ApiProperty()
    createdAt: Date;

    constructor(partial: Partial<UserResponseDto>){
        Object.assign(this, partial);
    }
}