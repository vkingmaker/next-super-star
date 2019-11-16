import { Request, Response } from 'express';
import SubscriptionModel from '../schema/subscription';
import User from '../schema/user';

export const addSubscription = async (req: Request, res: Response) => {
  const { email, sub } = res.locals.user || res.locals.admin;

  try {
    const { body } = req;

    const subscribeUser = new SubscriptionModel({ ...body, userId: sub });

    await subscribeUser.save();

    const subedUser = await User.update(
      { email, id: sub },
      {
        $PUT: { subscription: true }
      }
    );

    if (subedUser) {
      return res.status(201).send({
        isAdmin: subedUser.isAdmin,
        subscription: subedUser.subscription,
        name: subedUser.name,
        userId: subedUser.id
      });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};
