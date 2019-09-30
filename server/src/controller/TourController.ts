import { Request, Response } from 'express';
import { TourModel } from '../schema/tour';

export const addTour = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const tour = new TourModel(body);
    const newTour = await tour.save();
    res.status(201).send(newTour);
  } catch (error) {
    console.log('TOURS ERROR', error);
    res.status(400).send({ error });
  }
};

export const getTour = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query || 0;
    const { offset } = req.query || 0;

    const tour = await TourModel.find({}, null, {
      skip: +offset,
      limit: +limit
    });

    res.status(200).send(tour);
  } catch (error) {
    res.status(400).send({ error });
  }
};
