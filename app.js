/*---------------------Declaring-----------------------------*/
//#region 
const express = require('express');
const morgan = require('morgan');
const dontenv = require('dotenv');
dontenv.config();
const rateLimit = require('express-rate-limit');
const cors= require('cors');
const helmet = require('helmet');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const mongoose = require('mongoose');
//#endregion
/*-----------------------Initialization---------------------------*/
//#region
const server = express();
const port = process.env.PORT || 3000;
                  // MW for data formating 
server.use(express.json()); // data that comes from the body of the request need package body-parser 

server.use(morgan('dev'));

                  // MW for security
server.options('*', cors());
server.use(cors());
                  // MW for security HTTP headers => specially Sql injection
server.use(helmet());
                  // MW for rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
server.use('/api', limiter);

                  // MW for security data sanitization against NoSQL query injection
server.use(mongoSanitize());
                  // MW for security data sanitization against XSS
server.use(xss());
//#endregion
/*--------------------------------- Routing -----------------------------------------------------*/
const teachersRoutes = require("./Routes/teacherRouter");
const authRoutes = require("./Routes/auth");

              // for public files
server.use("/api/v1/public", express.static(path.join(__dirname, "public")));

const adminRouter = require('./Routes/adminRouter');
server.use('/api', adminRouter);
server.use("/api/v1/teachers", teachersRoutes);
server.use(express.json())
              // catch All Error
server.use((error,request, response, next) => {
  response.status(404).json({ message: "Not found" });
});


/*------------------------------Start Servers --------------------------------------------------------*/
                  // Connect to MongoDB cloud
mongoose
  .connect(process.env.Db)
  .then(() => console.log('Connected to MongoDB...'))
                  //Connect to Server
  server.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
  
                  // MW for every request not found
server.use((request, response, next) => {
  response.status(404).json({ message: "Not found" });
});
                  // MW Error handler Callback(4 arguments) , function.length
server.use((error, request, response,   next) => {
  response.status(500).send('Something went wrong!');
});
