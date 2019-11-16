import { Application } from 'express';
import * as VerifyUser from '../utils/VerifyUser';
import * as PhotoController from '../controller/PhotoController';
import cors from 'cors';

class Photo {
  public routes(app: Application): void {
    app.options('/starrecords/photos', cors());
    app
      .route('/starrecords/photos')
      .get(PhotoController.getPhoto)
      .post(VerifyUser.verifyAdmin, PhotoController.addPhoto);

    app
      .route('/starrecords/photos/:photoId')
      .delete(VerifyUser.verifyAdmin, PhotoController.removePhoto);

    app
      .route('/starrecords/photos/:photoId/like')
      .patch(VerifyUser.verifyAdmin, PhotoController.likePhoto);
  }
}

export default new Photo();
