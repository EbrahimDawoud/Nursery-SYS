const { validationResult } = require('express-validator');

exports.validatorAcitvator = (req, res, next) => {
  
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let msgs = errors.array().reduce(
            (current, output) => current + output.msg + " , ", ""
        )
        let err =  new Error();
        err.status = 422;
        err.message = msgs;
        next(err)
    }
    next()
  }