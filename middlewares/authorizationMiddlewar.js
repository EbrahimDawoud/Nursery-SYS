
const jwt = require("jsonwebtoken");
module.exports.isAdmin = (req, res, next) => {

    try {
        if (req.loggedInUser.role === "admin") {
            next();
        }
    }
    catch (error) {
        error.message = "Not authorized";
        error.statusCode = 401;
        next(error);
    }


}

module.exports.isTeacher = (req, res, next) => {
    try {
        if (req.loggedInUser.role === "teacher") {
            next();
        }
    }
    catch (error) {
        error.message = "Not authorized";
        error.statusCode = 401;
        next(error);
    }

  
   
}

module.exports.isChild = (req, res, next) => {
    if (req.loggedInUser.role === "child") {
        next();
    }
    else {
        let error = new Error("Not authorized");
        error.statusCode = 403;
        next(error);
    }
}

