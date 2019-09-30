import express, { Request, Response } from 'express';
import * as VerifyUser from '../utils/VerifyUser';
import * as MusicController from '../controller/MusicController';

export class MusicRoute {
  public routes(app: express.Application): void {
    app
      .route('/starrecords/musics')
      .get(MusicController.getMusic)
      .post(VerifyUser.verifyAdmin, MusicController.addMusic);
    app
      .route('/starrecords/musics/:musicId')
      .delete(VerifyUser.verifyAdmin, MusicController.removeMusic);

    app
      .route('/starrecords/musics/:musicId/like')
      .patch(MusicController.likeMusic);
  }
}
