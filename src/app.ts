import express, { Request, Response } from 'express';
import path from 'path';

/* -----> Third Party Packages <----- */
import cors from 'cors';
import corsOptions from './config/cors'; // cors options
import helmet from 'helmet';
import limiter from './config/ratelimiter';

/* -----> Authentication <----- */
import cookieParser from 'cookie-parser';

/* -----> handlers <----- */
import asyncHandler from './handlers/async.handler';
import ApiError from './handlers/apiError.handler';
import errorMiddleware from './handlers/error.handler';

/* -----> Template Engine <----- */
import loggerMorgan from './config/logger';

/* -----> API Routes <----- */
import apiRoutes from './api';

const app = express();

/* -----> Third Party Middlewares <----- */
app.use(cors()); // Testing
app.use(cors(corsOptions)); // CORS origin
app.use(helmet()); // Use Helmet to secure the app with default settings
app.use(limiter); // Use limiter to control to call the APIs
app.use(cookieParser()); // For Authentication

/* -----> Express Built-in Middlewares <----- */
app.use(express.json()); // // parse incoming JSON payloads and make it available in req.body
app.use(express.static(path.join(__dirname, '../', 'public'))); // Handle Static files

/* -----> logger Middleware <----- */
app.use(loggerMorgan);

/* -----> Routes <----- */

app.get('/', (req: Request, res: Response) => {
  console.log('I am Home Route');
  console.log('--------------');
  console.log(req.ip);
  console.log(req.method);
  console.log(req.originalUrl);
  console.log('--------------');
  res.send('I am Home route');
});

// API Versions
app.use('/api', apiRoutes);

/* -----> NotFound Route <----- */
app.use(
  asyncHandler(async () => {
    throw new ApiError(404, 'Route Not Found');
  }),
);

/* -----> Error Handling Middleware <----- */
app.use(errorMiddleware);

export default app;
