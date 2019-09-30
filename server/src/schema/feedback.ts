import { Document, Model, model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { default as Feedback } from '../model/feedback';

export interface FeedbackModel extends Feedback, Document {
  id: Number;
}

const Comment: Schema = new Schema(
  {
    message: String
  },
  { timestamps: true }
);

export const FeedbackSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    videoId: { type: Schema.Types.ObjectId, ref: 'Video' },
    comment: { type: Comment },
    mediaType: String,
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

FeedbackSchema.plugin(uniqueValidator);

export const FeedbackModel: Model<FeedbackModel> = model<FeedbackModel>(
  'Feedback',
  FeedbackSchema
);
