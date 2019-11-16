import dynamoose from 'dynamoose';
import { default as User } from '../model/Users';
import uuid from 'node-uuid';

export interface UserModel extends User, Document {
  id: Number;
}

export const UserSchema: dynamoose.Schema = new dynamoose.Schema(
  {
    id: {
      type: String,
      rangeKey: true,
      default: uuid
    },
    name: String,
    subscription: { type: Boolean, default: false },
    email: { type: String, hashKey: true, default: uuid },
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const User = dynamoose.model<UserModel, unknown>('User', UserSchema, {
  update: true
});

export default User;
