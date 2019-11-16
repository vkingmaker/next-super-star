import dynamoose from 'dynamoose';
// import uniqueValidator from 'mongoose-unique-validator';
import { default as Tour } from '../model/tours';
import uuid from 'node-uuid';

export interface TourModel extends Tour, Document {
  id: Number;
}

export const TourSchema: dynamoose.Schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      rangeKey: true,
      default: uuid
    },
    venue: { type: String, hashKey: true, required: true, default: uuid }
  },
  { timestamps: true }
);

const Tour = dynamoose.model<TourModel, unknown>('Tour', TourSchema, {
  update: true
});

export default Tour;
