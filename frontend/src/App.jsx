

import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import { Authcontext, useAuthcontext } from './Contextapi/Authcontext'
//import { Navigate } from 'react-router-dom'


function App() {
  const { authuser } = useAuthcontext()

  return (
    <>
      <div className='p-4  h-screen flex items-center justify-center'>


        <Routes>
          <Route path='/' element={authuser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path='/login' element={authuser ? <Navigate to='/' /> : <Login />} />
          <Route path='/signup' element={authuser ? <Navigate to='/' /> : <Signup />} />
        </Routes>
        <Toaster />

      </div>
    </>
  )
}

export default App
