const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Nursery_SYS',
    description: 'A demo for simple school system API',
  },
  host: 'localhost:4000'
};

console.log(__dirname);
const outputFile = './swagger-output.json';
const routes = ['./Routes/childRouter.js', './Routes/classRouter.js', "./Routes/loginRouter.js", "./Routes/teacherRouter.js", "./Routes/teacherRegister.js"];

/* NOTE: If you are using the express Router, you must pass in the 'Routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);