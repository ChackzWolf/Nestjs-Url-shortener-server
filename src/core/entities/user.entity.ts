import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // will handle createdAt and updatedAt automatically
export class UserEntity  {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  name?: string;  // optional

  @Prop({ type: [{ type: 'ObjectId', ref: 'Url' }] })
  urls: string[];
}

// Create the actual schema
export const UserSchema = SchemaFactory.createForClass(UserEntity );

// Extend Document so that NestJS knows it's a Mongo document
export type UserDocument = UserEntity  & Document;
