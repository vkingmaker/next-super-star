import { Document, Model, model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { default as Subscription } from '../model/subscriptions';

export interface SubscriptionModel extends Subscription, Document {
  id: Number;
}

export const SubscriptionSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, refs: 'User' },
    cardNumber: Number,
    postCode: Number,
    year: Number,
    Month: Number,
    cvv: { type: Number }
  },
  { timestamps: true }
);

SubscriptionSchema.plugin(uniqueValidator);

export const SubscriptionModel: Model<SubscriptionModel> = model<
  SubscriptionModel
>('Subscription', SubscriptionSchema);
