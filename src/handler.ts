import { Context, APIGatewayEvent } from "aws-lambda";
import serverlessHttp from "serverless-http";

import { app } from "./app";

// export const handler = serverlessHttp(app);
export const handler = async (event: APIGatewayEvent, context: Context): Promise<Object> => {
  try {
    const handler = serverlessHttp(app);
    return await handler(event, context);
  } catch (e) {
    return {
      status: 500,
      body: e,
    };
  }
};
