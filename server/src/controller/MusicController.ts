import { Request, Response, NextFunction } from 'express';
import { MusicModel } from '../schema/music';

export let addMusic = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const music = new MusicModel(data);
    const newMusic = await music.save();
    res.status(201).send(newMusic);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

export const getMusic = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query || 0;
    const { offset } = req.query || 0;

    const music = await MusicModel.find({}, null, {
      skip: +offset,
      limit: +limit
    });

    res.status(200).send(music);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const removeMusic = async (req: Request, res: Response) => {
  try {
    const { musicId } = req.params;
    const deletedMusic = await MusicModel.findByIdAndRemove(musicId);
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
    console.log('PARAMS', req.params);
    const { musicId } = req.params;
    const music = await MusicModel.findByIdAndUpdate(
      musicId,
      {
        $inc: { likes: 1 }
      },
      { new: true }
    );

    if (music) {
      return res.status(200).send(music);
    }

    throw `Music with the id ${musicId} does not exist`;
  } catch (error) {
    res.status(400).send({ error });
  }
};
