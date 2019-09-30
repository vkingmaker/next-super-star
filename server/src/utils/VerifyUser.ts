import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface userToken {
  _id: String;
  name: String;
  isAdmin: Boolean;
}

export let getToken = (user: userToken): string => {
  return jwt.sign(user, `${process.env.secretOrPrivateKey}`, {
    expiresIn: 3600
  });
};

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  console.log('TOKEN--->VERIFY', token);

  if (token) {
    jwt.verify(
      token,
      `${process.env.secretOrPrivateKey}`,
      (err: any, decoded: any) => {
        console.log('DECODED', decoded);
        if (decoded && decoded.isAdmin) {
          console.log('IS ADMIN------> VERIFY', decoded.isAdmin);
          next();
        } else {
          return res.json({
            status: 403,
            message: 'You must but a verified Admin'
          });
        }

        if (err) {
          return res.json({
            status: 401,
            message: 'You are not authenticated!'
          });
        }
      }
    );
  } else {
    return res.json({ status: 403, message: 'You must but a verified Admin' });
  }
};
