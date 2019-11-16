import { Request, Response, NextFunction } from 'express';
import { VerifyErrors } from 'jsonwebtoken';

const CognitoExpress = require('cognito-express');

const cognitoExpress = new CognitoExpress({
  region: 'us-east-1',
  cognitoUserPoolId: process.env.USER_POOL_ID,
  tokenUse: 'id', //Possible Values: access | id
  tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // let accessTokenFromClient = req.headers.idtoken;

  console.log('REQUEST BODY -------------------> ', req);

  let accessTokenFromClient = req.body.token || req.headers['x-api-key'];

  //Fail if token not present in header.
  if (!accessTokenFromClient) {
    res.status(401).json({ err: '[x-access-token] missing from header.' });
    return;
  }

  cognitoExpress.validate(accessTokenFromClient, function(
    err: VerifyErrors | string | null,
    response: any
  ) {
    //If API is not authenticated, Return 401 with error message.
    if (err) return res.status(401).send(err);

    console.log('VERIFY RESPONSE---------->', response);
    console.log('EMAIL --------->', response.email);

    if (response && response.email === 'vkingmaker@yahoo.com') {
      console.log('YOU ARE AN ADMIN------->');
      res.locals.admin = response;
      res.locals.user = null;
      next();
      return;
    }

    if (response) {
      console.log('IS USER ------> VERIFY', response['custom:isAdmin']);
      res.locals.user = response;
      res.locals.admin = null;
      next();
      return;
    }

    return res.json({
      status: 403,
      message: 'You must but a verified Admin'
    });
  });
};
