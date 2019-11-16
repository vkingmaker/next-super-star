import { Application } from 'express';
import * as TourController from '../controller/TourController';
import * as VerifyUser from '../utils/VerifyUser';

class Tour {
  public routes(app: Application): void {
    app
      .route('/starrecords/tours')
      .post(VerifyUser.verifyAdmin, TourController.addTour)
      .get(TourController.getTour);
  }
}

export default new Tour();
