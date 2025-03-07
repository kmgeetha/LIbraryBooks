import React from 'react'
import Navbar from '../Navbar'
import { Route, Routes } from 'react-router-dom'
import Home  from '../Home'
import Books from '../Books'
import ReadBooks from '../ReadBooks'
import About from '../About'
import Profile from './Profile'

const UsersPortal = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route element={<Home/>} path='/'/>
      <Route element={<Books/>} path='/books'/>
      <Route element={<About/>} path='/about' />
      <Route element={<ReadBooks/>} path='/readbooks/:id'/>
      <Route element={<Profile />} path='/profile'/>
    </Routes>
    </>
  )
}

export default UsersPortal