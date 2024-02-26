function checkFileUpload(req, res, next) {
    if (!req.file) {
        const error = new Error("Please upload an image for your profile!");
        error.status = 422; 
        return next(error);
    }
    next();
}
module.exports = checkFileUpload;
