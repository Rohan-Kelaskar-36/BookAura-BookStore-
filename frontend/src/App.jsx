import React from 'react'
import Home from './home/home'
import { Route,Routes } from 'react-router-dom'
import Courses from './Courses/Courses'
import Signup from './components/Signup'
import Contacts from './contacts/Contacts'

const App = () => {
  return (
    <>
  {/* <Home/>
  <Course/> */}
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Course" element={<Courses/>}/>
    <Route path="/Signup" element={<Signup/>}/>
    <Route path="/Contact" element={<Contacts/>}/>

  </Routes>
    </>
  )
}

export default App
