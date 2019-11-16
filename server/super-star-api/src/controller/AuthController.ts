import { Request, Response } from 'express';
import User from '../schema/user';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  ISignUpResult,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.USER_POOL_ID!,
  ClientId: process.env.USER_POOL_CLIENT_ID!
};

const userPool = new CognitoUserPool(poolData);

const getCognitoUser = (email: string) => {
  const userData = {
    Username: email,
    Pool: userPool
  };

  return new CognitoUser(userData);
};

const setUpRegistrationAttributes = (
  email: string,
  name: string,
  subscription: string,
  isAdmin: string
): CognitoUserAttribute[] => {
  const attributeList = [];

  const dataEmail = {
    Name: 'email',
    Value: email
  };
  const dataName = {
    Name: 'name',
    Value: name
  };
  const dataSubsctiption = {
    Name: 'custom:subscription',
    Value: subscription
  };
  const dataisAdmin = {
    Name: 'custom:isAdmin',
    Value: isAdmin
  };

  const attributeEmail = new CognitoUserAttribute(dataEmail);
  const attributeName = new CognitoUserAttribute(dataName);
  const attributeSubscription = new CognitoUserAttribute(dataSubsctiption);
  const attributeisAdmin = new CognitoUserAttribute(dataisAdmin);

  attributeList.push(
    attributeEmail,
    attributeName,
    attributeSubscription,
    attributeisAdmin
  );

  return attributeList;
};

export let registerUser = async (req: Request, resp: Response) => {
  const { name, email, password } = req.body;
  const isAdmin = 'false';
  const subscription = 'false';

  const attributeList = setUpRegistrationAttributes(
    email,
    name,
    subscription,
    isAdmin
  );

  userPool.signUp(
    email,
    password,
    attributeList,
    [],
    async (err: Error | undefined, res: ISignUpResult | undefined) => {
      if (err) {
        return resp.status(400).json({ message: err.message });
      }

      delete req.body.password;

      const user = new User({
        id: res!.userSub,
        ...req.body
      });

      try {
        const data = await user.save({ overwrite: false });

        resp.status(201).send({ user: data });
      } catch (error) {
        resp.status(400).send(error);
      }
    }
  );
};

export let loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  var authenticationData = {
    Username: email,
    Password: password
  };

  var authenticationDetails = new AuthenticationDetails(authenticationData);

  const cognitoUser = getCognitoUser(email);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: result => {
      const accessToken = result.getAccessToken().getJwtToken();

      const idToken = result.getIdToken().getJwtToken();

      res.status(200).send({
        email,
        accessToken,
        idToken
      });
    },
    onFailure: err => {
      return res.status(400).send(err);
    }
  });
};

export let verifyUser = async (req: Request, res: Response) => {
  const { email, code }: { email: string; code: string } = req.body;
  const cognitoUser = getCognitoUser(email);

  if (cognitoUser) {
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        res.status(400).json({ msg: 'error verifying account', err });
        return;
      } else {
        res.json({ msg: `${result}, account verified, you can now log in` });
      }
    });
  }
};
