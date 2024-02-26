function checkFileUpload(req, res, next) {
    if (!req.file) {
        const error = new Error("Please upload a file");
        error.status = 422; 
        return next(error);
    }
    next();
}
module.exports = checkFileUpload;
