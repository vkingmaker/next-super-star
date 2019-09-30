import { Document, Model, model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { default as Video } from '../model/videos';

export interface VideoModel extends Video, Document {
  id: Number;
}

export const VideoSchema: Schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    thumb_nail: { type: String, required: true },
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

VideoSchema.plugin(uniqueValidator);

export const VideoModel: Model<VideoModel> = model<VideoModel>(
  'Video',
  VideoSchema
);
