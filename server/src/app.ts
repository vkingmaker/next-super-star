import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';

import logger from 'morgan';
import { MusicRoute } from './routes/music';
import { Subscription } from './routes/subscription';
import { Photo } from './routes/photo';
import { Tour } from './routes/tour';
import { Video } from './routes/video';
import { AuthRoute } from './routes/authentication';

export class App {
  public app: express.Application;
  public musicRoute: MusicRoute = new MusicRoute();
  public subscriptionRoute: Subscription = new Subscription();
  public photoRoute: Photo = new Photo();
  public tourRoute: Tour = new Tour();
  public videoRoute: Video = new Video();
  public authRoute = new AuthRoute();
  public mongoUrl: string = 'mongodb://127.0.0.1:27017/super-star';

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(logger('dev'));

    this.musicRoute.routes(this.app);
    this.subscriptionRoute.routes(this.app);
    this.photoRoute.routes(this.app);
    this.tourRoute.routes(this.app);
    this.videoRoute.routes(this.app);
    this.authRoute.routes(this.app);
    this.mongoSetup();
    dotenv.config();
  }

  private mongoSetup(): void {
    mongoose
      .connect(this.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then(() => console.log('DB connected'));
  }
}

export default new App().app;
