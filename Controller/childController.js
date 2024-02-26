const Child = require("../Model/children");
const bcrypt = require("bcryptjs");
exports.addChild = (req, res, next) => {


}

exports.getAllChildren = (req, res, next) => {
    Child.find({})
        .then((data) => {
            res.status(200).json({ message: "Get All children", data });
        })
        .catch((error) => next(error))
}

exports.getChildById = (req, res, next) => {
    const id = req.params.id;
    Child.findById(id)
        .then((data) => {
            res.status(200).json({ message: `Get data for ${data.username}`, data })
        })
}
exports.addChild = (req, res, next) => {
    const hashedPasswrod = bcrypt.hashSync(req.body.password, 12)
    console.log(hashedPasswrod)
    const child = new Child({
        _id: req.body._id,
        fullName: req.body.fullName,
        password: hashedPasswrod,
        level: req.body.level,
        age: req.body.age,
        assignedClass: req.body.assignedClass,
        profileImage: req.file.path,

    })
    child.save()
        .then((data) => {
            res.status(201).json({ message: `created Account for ${data.fullName} successfully`, data })
        })
        .catch((err) => { next(err) })
}
module.exports.getChildById = (req, res, next) => {
    const teacherId = req.params.id;
    Child.findById(teacherId)
        .populate('class')
        .then((data) => {
            res.status(200).json({ message: `Get data for ${data.fullName}  by id`, data });
        })
        .catch((err) => {
            err.status = 500;
            err.message = "Failed to get Child by id";
            next(err);
        });
};
module.exports.updateChild = (req, res, next) => {
    const id = req.query.id;
    const hashedPasswrod = bcrypt.hashSync(req.body.password, 12);

    console.log(`id is ${id}`)
    if (!id) {
        next({ status: 400, message: "id is required to update" })
    }
    Child.findByIdAndUpdate(id, { password: hashedPasswrod, assignedClass: req.body.assignedClass }, { new: true })

        .then((data) => {
            res.status(200).json({ message: `Updated data for ${data.fullName} successfully`, data });
        })
        .catch((err) => {
            err.status = 500;
            err.message = "Failed to update Child";
            next(err);
        })
}

module.exports.deleteChild = (req, res, next) => {
    const id = req.query.id;
    if (!id) {
        next({ status: 400, message: "id is required to delete" })
    }
    Child.findByIdAndDelete(id)
        .then((data) => {
            res.status(200).json({ message: `Deleted data for ${data.fullName} successfully`, data });
        })
        .catch((err) => {
            err.status = 500;
            err.message = "Failed to delete Child";
            next(err);
        })
}