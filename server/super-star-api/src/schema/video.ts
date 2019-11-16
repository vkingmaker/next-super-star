import dynamoose from 'dynamoose';
import { default as Video } from '../model/videos';
import uuid from 'node-uuid';

export interface VideoModel extends Video, Document {
  id: Number;
}

export const VideoSchema: dynamoose.Schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      rangeKey: true,
      default: uuid
    },
    title: { type: String, required: true, unique: true, hashKey: true },
    url: { type: String, required: true },
    thumb_nail: { type: String, required: true },
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Video = dynamoose.model<VideoModel, unknown>('Video', VideoSchema, {
  update: true
});

export default Video;
