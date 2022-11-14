import express, { json } from "express";

import helmet from "helmet";
import Controller from "./controller";

const app = express();
app.use(json());
app.use(helmet());

app.use(Controller);

export { app };
