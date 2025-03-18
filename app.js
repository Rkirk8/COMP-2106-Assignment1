import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';


// Controller
import articleController from './controller/articles.js';
import { METHODS } from 'http';

// Config
const app = express();
app.use(bodyParser.json());

// DB connection
mongoose.connect(process.env.DB, {})
.then((res) => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`Connection Failure: ${err}`));

// swagger api config
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Assignment 1 API",
            version: "1.0.0",
            description: "Assignment 1 API",
        },
    },
    apis: ['./controller/*.js'],
};

const __dirname = path.resolve();
const __swaggerDistPath = path.join(__dirname, "node_modules", "swagger-ui-dist");
const openapiSpecs = swaggerJSDoc(options);
app.use('/api-docs', express.static(__swaggerDistPath, { index: false }), swaggerUi.serve, swaggerUi.setup(openapiSpecs));

// cors config 
app.use(cors({
    origin: process.env.CLIENT_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));


// Map url to controller
app.use('/v1/articles', articleController);

// Start server
app.listen(3000, () => { console.log("Server started on port 3000")});


