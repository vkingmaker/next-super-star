import dynamoose from 'dynamoose';
import uuid from 'node-uuid';
import { default as Music } from '../model/musics';

export interface MusicModel extends Music, Document {
  id: Number;
  title: string;
}

export const MusicSchema: dynamoose.Schema = new dynamoose.Schema(
  {
    id: { type: String, rangeKey: true, default: uuid },
    title: { type: String, hashKey: true, required: true, unique: true },
    url: { type: String, required: true },
    albumart: { type: String, required: true },
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Music = dynamoose.model<MusicModel, unknown>('Music', MusicSchema, {
  update: true
});

export default Music;
