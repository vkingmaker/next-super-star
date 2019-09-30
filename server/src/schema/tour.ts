import { Document, Model, model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { default as Tour } from '../model/tours';

export interface TourModel extends Tour, Document {
  id: Number;
}

export const TourSchema: Schema = new Schema(
  {
    venue: { type: String, required: true }
  },
  { timestamps: true }
);

TourSchema.plugin(uniqueValidator);

export const TourModel: Model<TourModel> = model<TourModel>('Tour', TourSchema);
