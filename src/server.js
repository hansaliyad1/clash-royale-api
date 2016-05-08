import config from './config/config';

import express from 'express';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import morgan from 'morgan';

import routes from './routes';
import middlewares from './middlewares';

const port = config.PORT;
const app = express();

require('./libraries/promisify-all')(['mongoose']);

mongoose.connect(config.MONGODB_URL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

// @TODO: fix middlewares.cors call, default shouldn't be needed
app.use(middlewares.cors.default);

app.listen(port, () => {
  console.log(`Magic happens on port ${port}`); // eslint-disable-line no-console
});

app.use('/api', routes);

export default app;