import { Request, Response, NextFunction } from 'express';
import MusicModel from '../schema/music';
import User from '../schema/user';

export let addMusic = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const music = new MusicModel(body);

    if (music) {
      const newMusic = await music.save();
      return res.status(201).send(newMusic);
    }

    throw 'Please make sure you are sending the right data';
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

export const getMusic = async (req: Request, res: Response) => {
  try {
    const music = await MusicModel.scan().exec();

    res.status(200).send(music);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const removeMusic = async (req: Request, res: Response) => {
  try {
    const { musicId } = req.params;
    const { title } = req.body;

    const deletedMusic = await MusicModel.delete({ title, id: musicId });

    if (deletedMusic) {
      return res.status(200).send(deletedMusic);
    }
    throw `Music with the id ${musicId} does not exist`;
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const likeMusic = async (req: Request, res: Response) => {
  try {
    const { musicId } = req.params;
    const { title } = req.body;

    const music = await MusicModel.update(
      { title, id: musicId },
      { $ADD: { likes: 1 } }
    );

    if (music) {
      return res.status(200).send(music);
    }

    throw `Music with the id ${musicId} does not exist`;
  } catch (error) {
    res.status(400).send({ error });
  }
};
