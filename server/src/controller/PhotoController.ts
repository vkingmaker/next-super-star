import { Request, Response } from 'express';
import { PhotoModel } from '../schema/photo';

export const addPhoto = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const photo = new PhotoModel(body);
    const newPhoto = await photo.save();
    res.status(201).send(newPhoto);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const getPhoto = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query || 0;
    const { offset } = req.query || 0;

    const photo = await PhotoModel.find({}, null, {
      skip: +offset,
      limit: +limit
    });

    res.status(200).send(photo);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const removePhoto = async (req: Request, res: Response) => {
  try {
    const { photoId } = req.params;
    const deletedPhoto = await PhotoModel.findByIdAndRemove(photoId);
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
    const photo = await PhotoModel.findByIdAndUpdate(
      photoId,
      {
        $inc: { likes: 1 }
      },
      { new: true }
    );

    if (photo) {
      return res.status(200).send(photo);
    }

    throw `Photo with the id ${photoId} does not exist`;
  } catch (error) {
    res.status(400).send({ error });
  }
};
