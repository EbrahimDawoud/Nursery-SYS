
const jwt = require("jsonwebtoken");
module.exports.isAdmin = (req, res, next) => {

    try {
        let token = req.get("authorization").split(" ")[1];
        let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.token = decodedToken;
        if (req.token.role === "admin") {
            next();
        }
    }
    catch (error) {
        error.message = "Not authenticated";
        error.statusCode = 401;
        next(error);
    }


}

module.exports.isTeacher = (req, res, next) => {
    try {
        let token = req.get("authorization").split(" ")[1];
        let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.token = decodedToken;
        if (req.token.role === "teacher" || req.token.role === "admin") {
            next();
        }
    }
    catch (error) {
        error.message = "Not authenticated";
        error.statusCode = 401;
        next(error);
    }

  
   
}

module.exports.isChild = (req, res, next) => {
    if (req.token.role === "child") {
        next();
    }
    else {
        let error = new Error("Not authorized");
        error.statusCode = 403;
        next(error);
    }
}

