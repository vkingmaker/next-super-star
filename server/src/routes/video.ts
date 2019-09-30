import { Application } from 'express';
import * as VideoController from '../controller/VideoController';
import * as VerifyUser from '../utils/VerifyUser';

export class Video {
  public routes(app: Application): void {
    app
      .route('/starrecords/videos')
      .get(VideoController.getVideo)
      .post(VerifyUser.verifyAdmin, VideoController.addVideo);

    app
      .route('/starrecords/videos/:videoId')
      .get(VideoController.getVideoById)
      .delete(VerifyUser.verifyAdmin, VideoController.removeVideo);

    app
      .route('/starrecords/videos/:videoId/like')
      .patch(VideoController.likeVideo);

    app
      .route('/starrecords/videos/:videoId/comment')
      .post(VideoController.addComment);
    app
      .route('/starrecords/videos/:mediaType/comments')
      .get(VideoController.getComment);
  }
}
