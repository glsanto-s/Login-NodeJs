import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 

import Login from './login'
import Registro from './registro'
import Home from './home'


import { Route, Routes, BrowserRouter, Link } from "react-router-dom";

function App() {
  return (
   <>
     <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Registro />} />      
            <Route path='/home' element={<Home />} />      
          </Routes>
  </BrowserRouter>


   </>
  )
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
     <App />
  </div>
);
