import app from './app';
import serverless from 'serverless-http';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

const server = serverless(app);

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  return await server(event, context);
};
