import React from 'react';
import { Navigate } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import './components/ShootingStar.scss';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <div>
     
    <Navbar/>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
    </div>
  );
};

export default App;
