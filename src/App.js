import React from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Switch, 
  Routes,
  BrowserRouter
} from 'react-router-dom';


import Login from './components/auth/Login.tsx';
import Register from './components/auth/Register.tsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
