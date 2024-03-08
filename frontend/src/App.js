import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import{BrowserRouter, Routes, Route} from "react-router-dom"

import Login from './Components/Login'
import Home from './Components/Home'
import DoctorLogin from './Components/DoctorLogin'
import Newpage from './Components/Newpage'
import Scancard from './Components/Scancard'
import AddDiagnosis from './Components/AddDiagnosis'
import PatientHistory from './Components/PatientHistory'



function App(){
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctorlogin" element={<DoctorLogin />} />
      <Route path="/newpage/:Id" element={<Newpage />} />
      <Route path="/" element={<Scancard />} />
      <Route path="/add-diagnosis/:Id" element={<AddDiagnosis />}/>
      <Route path="/patient-history/:Id" element={<PatientHistory/>}/>
      
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App