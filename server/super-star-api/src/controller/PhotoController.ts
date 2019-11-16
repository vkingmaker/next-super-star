import { Request, Response } from 'express';
import PhotoModel from '../schema/photo';
import User from '../schema/user';
import Photo from '../schema/photo';

export const addPhoto = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const photo = new PhotoModel(body);
    if (photo) {
      const newPhoto = await photo.save();
      return res.status(201).send(newPhoto);
    }
    throw 'Please make sure your data is in the right format';
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const getPhoto = async (req: Request, res: Response) => {
  try {
    const photo = await PhotoModel.scan().exec();

    res.status(200).send(photo);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const removePhoto = async (req: Request, res: Response) => {
  try {
    const { photoId } = req.params;
    const { caption } = req.body;
    const deletedPhoto = await PhotoModel.delete({ caption, id: photoId });

    if (deletedPhoto) {
      return res.status(200).send(deletedPhoto);
    }
    throw `Photo with the id ${photoId} does not exist`;
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const likePhoto = async (req: Request, res: Response) => {
  try {
    const { photoId } = req.params;
    const { caption } = req.body;

    const photo = await PhotoModel.update(
      { caption, id: photoId },
      { $ADD: { likes: 1 } }
    );

    if (photo) {
      return res.status(200).send(photo);
    }

    throw `Photo with the id ${photoId} does not exist`;
  } catch (error) {
    res.status(400).send({ error });
  }
};
