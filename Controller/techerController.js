const Teacher = require("../Model/teacher");
const upload = require("../middlewares/multer");
const bcrypt = require("bcryptjs");

exports.createTeacher =  (req, res, next) => {
    
     try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 12);
            const obj =  new Teacher ({
                username: req.body.username,
                password: hashedPassword,
                age: req.body.age,
                email: req.body.email,
                profileImage: req.file.path,
            });
             obj
                .save()
                .then((data)=>{
                    res.status(201).json({message: "Create Teacher in mongo DB", data});  
                })    
        
        
     } catch (error) { 
        
        error.status = 500;
        error.message +="Failed to create teacher in MongoDB";
        next(error);
     }
    
};
exports.getAllTeachers =(request, response, next) => {
    Teacher.find({})
        .then((data) => {
            response.status(200).json({ message: "Get all Teachers", data });
        })
}
//get teacher by id
module.exports.getTeacherById = (req, res, next) => {
    const teacherId  = req.params.id;
    Teacher.findById(teacherId)
        .then((data) => {
            res.status(200).json({ message: "Get Teacher by id", data });
        })
        .catch((err) => {
            err.status = 500;
            err.message = "Failed to get Teacher by id";
            next(err);
        });
};

module.exports.updateTeacher = (req, res, next) => {
    const id = req.query.id;
    Teacher.findById(id)
        .then((data)=>{
            res.status(200).json({ message: "Get Teacher by id", data });
        })
        .catch((err) => {
            err.status = 500;
            err.message = "Failed to get Teacher by id";
            next(err);
        });
};

module.exports.deleteTeacher = (req, res, next) => {
    const id = req.query.id;
    Teacher.findByIdAndDelete(id)
        .catch((err) => {
            err.status = 500;
            err.message = "Failed to get Teacher by id";
            next(err);
        });
};

















// const bcrypt = require("bcryptjs");
// const Teacher = require("../Model/teacher");

// exports.register = async (req, res, next) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 12);
//     const teacher = await Teacher.create({
//       username: req.body.username,
//       password: hashedPassword, 
//       age: req.body.age,
//       image: req.body.image
//     });
    

//     teacher.password = undefined;

//     res.status(201).json({ teacher });
//   } catch (err) {

//     res.status(500).json({ message: "There is an error", err:`${err.message}` });
//   }
// };

// exports.update = async (req, res, next) => {
//   try {
//     const { userId } = req.params;

//     const updatedTeacher = await Teacher.find;

//     res.status(201).json({ teacher });
//   } catch (err) {
//     res.status(500).json({ message: "There is an error" });
//   }
// };
