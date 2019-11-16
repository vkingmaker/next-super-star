import dynamoose from 'dynamoose';
import { default as Photo } from '../model/Users';
import uuid from 'node-uuid';

export interface PhotoModel extends Photo, Document {
  id: Number;
  likes: Number;
}

export const PhotoSchema: dynamoose.Schema = new dynamoose.Schema(
  {
    id: { type: String, rangeKey: true, default: uuid },
    caption: { type: String, required: true, hashKey: true, default: uuid },
    url: { type: String, required: true },
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Photo = dynamoose.model<PhotoModel, unknown>('Photo', PhotoSchema, {
  update: true
});

export default Photo;
