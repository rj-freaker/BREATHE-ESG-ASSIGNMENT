import './App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer';
import { Route, Routes, Navigate} from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import React from 'react';
import { RootState } from './redux/store';
import { useSelector } from 'react-redux';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <div className='App'>
        <Header/>
            <Routes>
              <Route path='/' element={<LandingPage/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/dashboard'
               element={isAuthenticated ? <Dashboard/> : <Navigate to='/login'/>}
              />
            </Routes>
            <ToastContainer/>
        <Footer/>
    </div>
  )
}

export default App
