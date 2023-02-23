import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 

import Login from './Login'
import Registro from './Registro'


import { Route, Routes, BrowserRouter, Link } from "react-router-dom";

function App() {
  return (
   <>
     <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Registro />} />      
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
