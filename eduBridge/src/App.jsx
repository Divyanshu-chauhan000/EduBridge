import React from 'react'
import {  Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/Home'
import Register from './pages/Register'
import VerifyOtp from './pages/VerifyOtp'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'
import MainLayout from './pages/MainLayout'
import ProfileEdit from './pages/ProfileEdit'
import Search from "./pages/Search"
import Notes from "./pages/Notes"
import Messages from "./pages/Messages"
import Notifications from "./pages/Notifications"
import Create from "./pages/Create"



const App = () => {
  return (
  
    <Routes>
      {/* <Route path='/' element={<Navigate to='/login'/>}/> */}
     <Route path='/' element={<Login/>}/>
     <Route path='verify-otp' element={<VerifyOtp/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route element={<MainLayout/>}>
     <Route path="/profile/:userId" element={<PrivateRoute><Profile/></PrivateRoute>} />
     <Route path='/home' element={<PrivateRoute>
      <Home/>
     </PrivateRoute>}/>
     <Route
          path="/search"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <PrivateRoute>
              <Notes />
            </PrivateRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <PrivateRoute>
              <Messages />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />
     <Route path='/editprofile' element={ <PrivateRoute>
              <ProfileEdit />
            </PrivateRoute>}/>
     </Route>
    </Routes>

    
  
  )
}

export default App