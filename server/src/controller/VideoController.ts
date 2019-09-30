import { Request, Response } from 'express';
import { VideoModel } from '../schema/video';
import { FeedbackModel } from '../schema/feedback';

export let addVideo = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const video = new VideoModel(body);
    const newVideo = await video.save();
    res.status(201).send(newVideo);
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const getVideo = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query || 0;
    const { offset } = req.query || 0;

    const video = await VideoModel.find({}, null, {
      skip: +offset,
      limit: +limit
    });

    res.status(200).send(video);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const getVideoById = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;
    let video = await VideoModel.findByIdAndRemove(videoId);
    if (video) {
      video = await VideoModel.findByIdAndUpdate(
        videoId,
        { $inc: { watched: 1 } },
        { new: true }
      );
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
    const deletedVideo = await VideoModel.findByIdAndRemove(videoId);
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
    const video = await VideoModel.findByIdAndUpdate(
      videoId,
      {
        $inc: { likes: 1 }
      },
      { new: true }
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
    const { comment, userId, mediaType } = req.body;
    const { videoId } = req.params;

    const userComment = new FeedbackModel({
      userId,
      videoId,
      comment,
      mediaType
    });

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

    const comments = await FeedbackModel.find({ mediaType });
    res.status(200).send(comments);
  } catch (err) {
    console.log('ERROR', err);
  }
};
