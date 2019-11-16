import dynamoose from 'dynamoose';
import uuid from 'node-uuid';
import { default as Subscription } from '../model/subscriptions';

export interface SubscriptionModel extends Subscription, Document {
  id: Number;
}

export const SubscriptionSchema: dynamoose.Schema = new dynamoose.Schema(
  {
    id: { type: String, rangeKey: true, default: uuid },
    userId: { type: String, hashKey: true, required: true, default: uuid },
    cardNumber: Number,
    postCode: Number,
    year: Number,
    Month: Number,
    cvv: { type: Number }
  },
  { timestamps: true }
);

const Subscription = dynamoose.model<SubscriptionModel, unknown>(
  'Subscription',
  SubscriptionSchema,
  {
    update: true
  }
);

export default Subscription;
