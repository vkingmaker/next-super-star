import express from 'express';
import * as SubscriptionController from '../controller/SubscriptionController';

export class Subscription {
  public routes(app: express.Application): void {
    app
      .route('/starrecords/subscription')
      .post(SubscriptionController.addSubscription);
  }
}
