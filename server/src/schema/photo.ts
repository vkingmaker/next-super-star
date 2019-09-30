import { Document, Model, model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { default as Photo } from '../model/Users';

export interface PhotoModel extends Photo, Document {
  id: Number;
}

export const PhotoSchema: Schema = new Schema(
  {
    caption: String,
    url: { type: String, required: true },
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

PhotoSchema.plugin(uniqueValidator);

export const PhotoModel: Model<PhotoModel> = model<PhotoModel>(
  'Photo',
  PhotoSchema
);
