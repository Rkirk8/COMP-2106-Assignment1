import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Controller
import articleController from './controller/article.js';

// Config
const app = express();
app.use(bodyParser.json());

// DB connection
mongoose.connect(process.env.DB, {})
.then((res) => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`Connection Failure: ${err}`));

// Map url to controller
app.use('/article', articleController);

// Start server
app.listen(3000, () => { console.log("Server started on port 3000")});


