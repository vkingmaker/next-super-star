import express from 'express';
import * as SubscriptionController from '../controller/SubscriptionController';
import * as VerifyUser from '../utils/VerifyUser';

class Subscription {
  public routes(app: express.Application): void {
    app
      .route('/starrecords/subscription')
      .post(VerifyUser.verifyAdmin, SubscriptionController.addSubscription);
  }
}

export default new Subscription();
