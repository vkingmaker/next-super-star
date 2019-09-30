import { Document, Model, model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { default as Music } from '../model/musics';

export interface MusicModel extends Music, Document {
  id: Number;
}

export const MusicSchema: Schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    albumart: { type: String, required: true },
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

MusicSchema.plugin(uniqueValidator);

export const MusicModel: Model<MusicModel> = model<MusicModel>(
  'Music',
  MusicSchema
);
