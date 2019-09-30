import { Request, Response } from 'express';
import { SubscriptionModel } from '../schema/subscription';
import { UserModel } from '../schema/user';

export const addSubscription = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    data.userId = data.userId.match(/[A-Za-z0-9]+/)[0];

    const subscribeUser = new SubscriptionModel(data);

    await subscribeUser.save();

    const subedUser = await UserModel.findByIdAndUpdate(
      data.userId,
      { $set: { subscription: true } },
      { new: true }
    );
    if (subedUser) {
      return res.status(201).send({
        isAdmin: subedUser.isAdmin,
        subscription: subedUser.subscription,
        name: subedUser.name,
        userId: subedUser._id
      });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};
