import React from 'react'
import Navbar from '../Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home'
import Books from '../Books'
import Addbooks from './Addbooks'
import About from '../About'
import Users from '../Users'
import AddUsers from './AddUsers'
import ReadBooks from '../ReadBooks'

const AdminPortal = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
          <Route element={<Home/>} path='/' />
          <Route element={<Books/>} path='/books' />
          <Route element={<About/>}  path='/about'/>
          <Route element={<Addbooks/>} path='/addbooks' />
          <Route element={<Users/>}  path='/users'/>
          <Route element={<AddUsers/>}  path='/addusers'/>
          <Route element ={<ReadBooks/>} path='/readbooks/:id' />
        </Routes>
    </div>
  )
}

export default AdminPortal