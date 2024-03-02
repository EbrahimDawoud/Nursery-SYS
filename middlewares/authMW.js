module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                const error = new Error();
                error.message = "Login first!";
                error.statusCode = 401;
                throw error;
            }
    
        let token = req.loggedInUser.split(" ")[1];
        let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.loggedInUser = decodedToken;
        next();
    } catch (error) {
        error.message = "Login first!";
        error.statusCode = 401;
        next(error);
    }
    
}

