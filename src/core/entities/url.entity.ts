import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UrlEntity {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true, unique: true })
  shortCode: string;

  @Prop({ default: 0 })
  visitCount: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;   // Relation with User
}

export type UrlDocument = UrlEntity & Document;
export const UrlSchema = SchemaFactory.createForClass(UrlEntity);


// @Prop → Defines a field inside the MongoDB document.

// @Schema → Defines that this class is a MongoDB collection.

// SchemaFactory → Converts the class into an actual Mongoose Schema.

// Document → Tells TypeScript that this is a Mongoose document (not just a random object).

// Types.ObjectId → Special Mongoose ID datatype to link documents together.