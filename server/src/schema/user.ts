import { Document, Model, model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { default as User } from '../model/Users';

export interface UserModel extends User, Document {
  id: Number;
}

export const UserSchema: Schema = new Schema(
  {
    name: String,
    subscription: { type: Boolean, default: false },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

export const UserModel: Model<UserModel> = model<UserModel>('User', UserSchema);
