const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    Id:String,
    name:String,
    password:String,
    age:String,
    dob:String,
    address:String,
    phone:String,
    gender:String,
    role:String,
    
})

const DoctorSchema = new mongoose.Schema({
    license:String,
    password:String,
    role:String,
})



const DiagnosesSchema = new mongoose.Schema({
  Id: String,
  diagnosis: String,
  hospital: String,
  doctor: String,
  date: String,
  files: [{
    data: Buffer, // Binary data for file storage
    contentType: String, // MIME type of the file
  }],
});

const UserModel = mongoose.model("patients",UserSchema)
const DoctorModel = mongoose.model("doctors",DoctorSchema)
const ReportModel = mongoose.model("reports",DiagnosesSchema)


module.exports = {
    UserModel,DoctorModel, ReportModel
}


