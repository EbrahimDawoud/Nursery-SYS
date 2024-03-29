/*------------------------ Core Packages--------------- */
const express = require('express');
const server = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors");
dotenv.config();
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
/*------------------------ Packages To Servers--------------- */
server.options("*", cors());
server.use(cors());
server.use(helmet());
server.use("/api", limiter);
server.use(express.json({ limit: "10kb" }));
server.use(mongoSanitize());
server.use(express.json()); 
server.use(morgan('dev'));

/*------------------------ Routers--------------- */

const teacherRouter = require("./Routes/teacherRouter");
const authRouter = require('./Routes/authenticationRouter');
const childrenRouter = require("./Routes/childRouter");
const classRouter = require("./Routes/classRouter");
const changePassRouter = require("./Routes/changePasswordRouter");
const authMW = require("./middlewares/authMW");

/*------------------------ Middlewares--------------- */
server.use("/public", express.static(path.join(__dirname, "public")));
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require('./swagger-output.json')));
server.use( authRouter);
server.use( authMW);
server.use( teacherRouter);
server.use( childrenRouter);
server.use( classRouter);
server.use( changePassRouter);

/*------------------------ Servers--------------- */

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB connection successful!")
    server.listen(process.env.PORT, () => console.log(`Server is  Listening at http://localhost:${process.env.PORT}`));
  })
  .catch(() => { console.log("Could not connect to DB!") })


server.use((request, response, next) => {
  response.status(404).json({ message: "Error 404 NotFound" });
});
// MW Error handler Callback(4 arguments) , function.length
server.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


