import express from 'express';
import dynamoose from 'dynamoose';
import * as dotenv from 'dotenv';
import cors from 'cors';

import nodefetch from 'node-fetch';

(global as any).fetch = nodefetch;

import logger from 'morgan';
import Music from './routes/music';
import Subscription from './routes/subscription';
import Photo from './routes/photo';
import Tour from './routes/tour';
import Video from './routes/video';
import Auth from './routes/authentication';

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(
      cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204
      })
      // this.app.use(
      //   cors({
      //     allowedHeaders: [
      //       'x-access-token',
      //       'Content-type',
      //       'Accept',
      //       'X-Requested-With',
      //       'Origin'
      //     ]
      //   })
    );
    // this.app.use((req, res, next) => {
    //   res.header('Access-Control-Allow-Origin', '*');
    //   res.header(
    //     'Access-Control-Allow-Headers',
    //     'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
    //   );
    //   res.header('Access-Control-Allow-Credentials', 'true');
    //   next();
    // });
    this.app.use(express.json());
    this.app.use(logger('dev'));

    Music.routes(this.app);
    Subscription.routes(this.app);
    Photo.routes(this.app);
    Tour.routes(this.app);
    Video.routes(this.app);
    Auth.routes(this.app);
    dotenv.config();

    if (process.env.IS_OFFLINE == 'false') {
      dynamoose.ddb();
      console.log('DYNAMOOSE');
    } else {
      dynamoose.local();
      console.log('ELSE DYNAMOOSE');
    }
  }
}

export default new App().app;
