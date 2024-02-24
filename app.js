const express = require('express');
const server = express();
const morgan = require('morgan');
const port = process.env.port || 3000;

// MW for data formating 
server.use(express.json()); // data that comes from the body of the request need package body-parser 
//server.use(express.urlencoded());
server.use(morgan('dev'));

//router teacher and child
// server.use(teacherRouter, childRouter, classRouter);

// MW for every request not found
server.use((request, response, next) => {
  response.status(404).json({ message: "Not found" });
});
// MW Error handler Callback(4 arguments) , function.length
server.use((error, request, response,   next) => {
  response.status(500).send('Something went wrong!');
});

server.listen(port, () => console.log(`Server is  Listening at http://localhost:${port}`));
