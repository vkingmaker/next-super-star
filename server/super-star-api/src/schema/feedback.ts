import dynamoose from 'dynamoose';
import uuid from 'node-uuid';
import { default as Feedback } from '../model/feedback';

export interface FeedbackModel extends Feedback, Document {
  id: Number;
  userId: String;
  videoId: String;
  mediaType: String;
}

const Comment: dynamoose.Schema = new dynamoose.Schema(
  {
    message: String
  },
  { timestamps: true }
);

export const FeedbackSchema: dynamoose.Schema = new dynamoose.Schema(
  {
    id: { type: String, rangeKey: true, default: uuid },
    userId: { type: String, hashKey: true, default: uuid },
    videoId: { type: String, default: uuid },
    comment: { type: String },
    mediaType: String,
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Feedback = dynamoose.model<FeedbackModel, unknown>(
  'Feedback',
  FeedbackSchema,
  {
    update: true
  }
);

export default Feedback;
