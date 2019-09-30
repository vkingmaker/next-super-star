import axios from 'axios';
import { baseURL } from './auth';

export const Subscription = async (
  cardNumber: number,
  cvv: number,
  userId: string,
  postCode: number,
  Month: number,
  year: number
) => {
  const response = await axios.post(`${baseURL}/starrecords/subscription`, {
    data: { cardNumber, cvv, userId: userId, postCode, Month, year }
  });

  return response;
};
