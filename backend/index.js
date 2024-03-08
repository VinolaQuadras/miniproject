
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { UserModel, DoctorModel, ReportModel } = require('./models/User');
const app = express();
app.use(cors());
app.use(express.json());
const Blockchain = require('./blockchain');


mongoose.connect('mongodb+srv://vinola04092003:iWymGhrwHJmlK0xz@medicinedb.ykocyaz.mongodb.net/?retryWrites=true&w=majority&appName=medicinedb');


mongoose.connection.once('open', async () => {
  try {
      await UserModel.createCollection();
      console.log('Patients collection created successfully');

      await DoctorModel.createCollection();
      console.log('Doctors collection created successfully');

      await ReportModel.createCollection();
      console.log('Reports collection created successfully');
  } catch (error) {
      console.error('Error creating collections:', error);
  }
});

const myBlockchain = new Blockchain();
app.get('/viewBlockchain', (req, res) => {
  res.json({ status: 'Success', blockchain: myBlockchain.chain });
});

app.post('/addBlock', (req, res) => {
  const { data } = req.body;
  const newBlock = new Block(myBlockchain.chain.length, new Date().toLocaleString(), data);
  myBlockchain.addBlock(newBlock);
  res.json({ status: 'Success', message: 'Block added to the blockchain.' });
});



app.post('/addDiagnosis', upload.array('files', 10), async (req, res) => {
  console.log(req.files);
  try {
    const { Id, diagnosis, hospital, doctor, date } = req.body;

    



    // Access files buffer as binary data
    const fileData = req.files ? req.files.map((file) => ({
      data: file.buffer,
      contentType: file.mimetype,
    })) : [];

    const newReport = new ReportModel({
      Id,
      diagnosis,
      hospital,
      doctor,
      date,
      files: fileData,
    });

    const savedReport = await newReport.save();

    res.json({ status: 'Success', report: savedReport });
  } catch (error) {
    console.error('Error adding diagnosis:', error);
    res.status(500).json({ status: 'Error', message: 'Internal server error' });
  }
});









app.get('/getPatientHistory/:Id', async (req, res) => {
  try {
    const { Id } = req.params;

    // Find reports with the given Id
    const patientReports = await ReportModel.find({ Id });

    // Respond with the patient history, including file data
    const reportsWithFileData = await Promise.all(
      patientReports.map(async (report) => {
        const fileDataArray = await getFileData(report.files);
        return { ...report.toObject(), files: fileDataArray };
      })
    );

    res.json({ status: 'Success', reports: reportsWithFileData });
  } catch (error) {
    console.error('Error fetching patient history:', error);
    // Handle the error as needed
    res.status(500).json({ status: 'Error', message: 'Internal server error' });
  }
});

async function getFileData(files) {
  try {
    if (files && Array.isArray(files)) {
      // Convert each file buffer to a Base64 string
      const fileDataArray = await Promise.all(
        files.map(async (file) => ({
          data: file.data.toString('base64'),
          contentType: file.contentType,
        }))
      );
      return fileDataArray;
    }
    return null; // Return null if files is undefined or not an array
  } catch (error) {
    console.error('Error converting file data:', error);
    return null; // Return null in case of an error
  }
}


app.post('/login', async (req, res) => {
  const { Id, password } = req.body;

  try {
    // Find user by Id in the UserModel
    const user = await UserModel.findOne({ Id });

    if (!user) {
      return res.status(401).json({ status: 'Error', message: 'User not found' });
    }

    // Compare passwords
    if (user.password !== password) {
      return res.status(401).json({ status: 'Error', message: 'Incorrect password' });
    }

    // Successful login
    res.json({ status: 'Success', userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Error', message: 'Internal server error' });
  }
});



app.get('/getUserData/:Id', async (req, res) => {
    const { Id } = req.params;
  
    try {
      // Find patient by Id
      const patient = await UserModel.findOne({ Id });
  
      if (!patient) {
        return res.status(404).json({ status: 'Error', message: 'Patient not found' });
      }
  
      // Return patient details
      res.json({ status: 'Success', patient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'Error', message: 'Internal server error' });
    }
  });

  app.post('/doctorlogin',(req,res)=>{
    const{license,password}=req.body;
    DoctorModel.findOne({license:license})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json({status:'Success',userId:user._id})
            }else{
                res.json("the password is incorrect")
                
            }
        }else{
            res.json("No record existed")
        }
    })
})




app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
