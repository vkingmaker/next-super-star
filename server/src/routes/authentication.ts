import { Application } from 'express';
import * as AuthController from '../controller/AuthController';

export class AuthRoute {
  public routes(app: Application): void {
    app.route('/register').post(AuthController.registerUser);
    app.route('/login').post(AuthController.loginUser);
  }
}
