import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './Component/LandingPage'
import './App.css'
import AdminPortal from './Component/Admin/AdminPortal'
import UserPortal from './Component/Users/UserPortal'
// import ReadBooks from './Component/ReadBooks'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LandingPage/>} path='/' />
          <Route element={<AdminPortal/>} path='/adminportal/*' />
          <Route element={<UserPortal/>} path='/userportal/*' />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App