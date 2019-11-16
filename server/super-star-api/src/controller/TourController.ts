import { Request, Response } from 'express';
import Tour from '../schema/tour';

export const addTour = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const tour = new Tour(body);
    const newTour = await tour.save();
    res.status(201).send(newTour);
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const getTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.scan().exec();
    res.status(200).send(tour);
  } catch (error) {
    res.status(400).send({ error });
  }
};
