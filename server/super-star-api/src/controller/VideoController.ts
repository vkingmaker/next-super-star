import { Request, Response } from 'express';
import Video from '../schema/video';
import FeedbackModel from '../schema/feedback';
import User from '../schema/user';

export let addVideo = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const video = new Video(body);
    if (video) {
      const newVideo = await video.save();
      return res.status(201).send(newVideo);
    }

    throw 'Please make sure you are data is in the right format';
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const getVideo = async (req: Request, res: Response) => {
  try {
    const video = await Video.scan().exec();
    res.status(200).send(video);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const getVideoById = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const { title } = req.body;

    let video = await Video.get({ title, id: videoId });
    if (video) {
      return res.status(200).send(video);
    }
    throw `Video with the id ${videoId} does not exist`;
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const removeVideo = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const { title } = req.body;

    const deletedVideo = await Video.delete({ title, id: videoId });
    if (deletedVideo) {
      return res.status(200).send(deletedVideo);
    }
    throw `Video with the id ${videoId} does not exist`;
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const likeVideo = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    const { title } = req.body;

    const video = await Video.update(
      { title, id: videoId },
      { $ADD: { likes: 1 } }
    );
    if (video) {
      return res.status(200).send(video);
    }

    throw `Video with the id ${videoId} does not exist`;
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;

    const userComment = new FeedbackModel({ ...req.body, videoId });

    const newComment = await userComment.save();

    res.status(201).send(newComment);
  } catch (err) {
    console.log('SERVER ERROR', err);
    res.status(500).send({ err });
  }
};

export const getComment = async (req: Request, res: Response) => {
  try {
    const { mediaType } = req.params;

    const comments = await FeedbackModel.scan({ mediaType }).exec();

    res.status(200).send(comments);
  } catch (err) {
    console.log('ERROR', err);
  }
};
