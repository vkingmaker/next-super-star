import { Application } from 'express';
import * as VerifyUser from '../utils/VerifyUser';
import * as PhotoController from '../controller/PhotoController';

export class Photo {
  public routes(app: Application): void {
    app
      .route('/starrecords/photos')
      .get(PhotoController.getPhoto)
      .post(VerifyUser.verifyAdmin, PhotoController.addPhoto);

    app
      .route('/starrecords/photos/:photoId')
      .delete(VerifyUser.verifyAdmin, PhotoController.removePhoto);

    app
      .route('/starrecords/photos/:photoId/like')
      .patch(PhotoController.likePhoto);
  }
}
