import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register  from './Register';
import Login  from './Login';
import Driverhome from './driverhome';
import Feedback from './feedback';    
import { ToastContainer } from 'react-toastify';
import Home from './Home';
import Book from './Book';

function App() {
   
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/driver' element={<Driverhome/>}></Route>
        <Route path='/feedback' element={<Feedback/>}></Route>
        {/* <Route path='/book' element={<App1/>}></Route> */}
        
        <Route path='/current' element={<Book/>}></Route>
       </Routes>

       </BrowserRouter>
      
    </div>
  );
}

export default App;