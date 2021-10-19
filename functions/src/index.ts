import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import * as functions from 'firebase-functions';

import { travellerRouter } from './routes';

export const app: Application = express();


app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', "*");
  // res.header('Access-Control-Allow-Methods', "GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATH")
  // res.header('Access-Control-Allow-Headers', "accept, Accept-Language, Content-Language, Content-Type");
  // res.header('Access-Control-Allow-Credentials', "true");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', travellerRouter)
app.get('/', (request, response) => response.status(200).json({ message: "API Works!" }));

app.use(express.static('public'));

exports.app = functions.https.onRequest(app);