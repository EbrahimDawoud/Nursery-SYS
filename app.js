
const express = require('express');
const server = express();
const morgan = require('morgan');
const port = process.env.port || 3000;
// for environment variables
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

// MW for data formating 
server.use(express.json()); // data that comes from the body of the request need package body-parser 

server.use(morgan('dev'));

//router teacher and child
const teacherRouter = require("./Routes/teacherRouter");
const loginRouter = require('./Routes/loginRouter');
const autMw = require("./middlewares/authMiddlewar");
const registerRouter = require('./Routes/teacherRegister');
const childrenRouter = require("./Routes/childRouter");
const classRouter = require("./Routes/classRouter");
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(require('./swagger-output.json')));
server.use( registerRouter)
server.use( loginRouter)
server.use(autMw)
server.use( teacherRouter);
server.use( childrenRouter);
server.use( classRouter);

// MW for every request not found
server.use((request, response, next) => {
  response.status(404).json({ message: "Not found" });
});
// MW Error handler Callback(4 arguments) , function.length
server.use((error, request, response, next) => {
  response.status(500).send(error.message);
});
// mongoose.connect("mongodb://localhost:27017/PD")
//make the two severs connected in relation


mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB connection successful!")
    server.listen(process.env.PORT, () => console.log(`Server is  Listening at http://localhost:${process.env.PORT}`));
  })

  .catch(() => { console.log("Could not connect to DB!") })









//