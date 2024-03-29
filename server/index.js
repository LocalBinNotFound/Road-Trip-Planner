const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const middlewares = require('./middlewares');

require('dotenv').config();

const app = express();

app.enable('trust proxy');

mongoose.connect(process.env.CLOUD_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

const pointOfInterestsRouter = require('./API/pointOfInterests');

app.use('/API/pointOfInterests', pointOfInterestsRouter);

const usersRouter = require('./API/users');

app.use('/API/users', usersRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
