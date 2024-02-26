const Class = require("../Model/class");

exports.getClasses = (req, res, next) => {
    Class.find()
        .populate("supervisor")
        .populate("children")
        .then((c) => {
            res.status(200).json(c);
        })
        .catch((error) => {
            next(error);
        });
};

exports.addClass = (req, res, next) => {
    const newClass = new Class({
        name: req.body.name,
        supervisor: req.body.supervisor,
        children: req.body.children
    });
    newClass.save()
        .then((data) => {
            res.status(201).json({
                message: "Class added successfuly",
                data
            })
        }).catch((error) => {
            next(error);
        })
};

exports.updateClass = (req, res, next) => {
    Class.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then((data) => {
            res.status(200).json({
                message: "class updated successfully",
                data
            });
        })
        .catch((error) => {
            next(error);
        });
};

exports.deleteClass = (req, res, next) => {
    Class.findByIdAndDelete(req.body._id)
        .then((data) => {
            res.status(200).json({
                message: "class deleted successfully",
                data
            });
        })
        .catch((error) => {
            next(error);
        });
};


exports.getClassById = (req, res, next) => {
    Class.findById(req.params["id"])
        .populate("supervisor")
        .populate("children")
        .then((data) => {
            if (!data) throw new Error("Id does not exist");
            res.status(200).json(data);
        })
        .catch((error) => {
            next(error);
        });
};


exports.getStudentByClassId = (req, res, next) => {
    Class.findById(req.params["id"])
        .populate("children")
        .then((data) => {
            if (!data) throw new Error("Id does not exist");
            res.status(200).json(data.children);
        })
        .catch((error) => {
            next(error);
        });
};

exports.getTeacherByClassId = (req, res, next) => {
    Class.findById(req.params["id"])
        .populate("supervisor")
        .then((data) => {
            if (!data) throw new Error("Id does not exist");
            res.status(200).json(data.supervisor);
        })
        .catch((error) => {
            next(error);
        });
};