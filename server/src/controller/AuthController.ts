import { Request, Response } from 'express';
import * as VerifyUser from '../utils/VerifyUser';
import { UserModel } from '../schema/user';
import * as bcrypt from 'bcrypt';

export let registerUser = async (req: Request, res: Response) => {
  try {
    const newUser = await new UserModel(req.body.data);

    newUser.password = bcrypt.hashSync(newUser.password, 10);

    await newUser.save((error, user) => {
      if (error) {
        return res.status(500).send({ error: error.message });
      }
      const token = VerifyUser.getToken({
        _id: user._id,
        name: user.name,
        isAdmin: user.isAdmin
      });
      res.status(201).send({
        token: token,
        userId: user._id,
        isAdmin: user.isAdmin,
        name: user.name,
        subscription: user.subscription
      });
    });
  } catch (e) {
    res.status(500).send('An error has occured!');
  }
};

export let loginUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body.data;
    const { password } = req.body.data;

    await UserModel.findOne({ email }, (err, user) => {
      if (!user) {
        return res.status(404).send();
      }

      const validate = bcrypt.compareSync(password, user.password.valueOf());

      if (validate) {
        const token = VerifyUser.getToken({
          _id: user._id,
          name: user.name,
          isAdmin: user.isAdmin
        });

        return res.json({
          token: token,
          userId: user._id,
          isAdmin: user.isAdmin,
          name: user.name,
          subscription: user.subscription
        });
      }
    });
  } catch (error) {
    res.status(401).send({ error: 'Wrong password' });
  }
};
