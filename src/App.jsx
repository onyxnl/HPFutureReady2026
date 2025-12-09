import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing.jsx';
import Loginauthentication from './pages/Loginauthentication.jsx';
import Home from './pages/Home.jsx';
import Register1 from './pages/Register1.jsx';
import Register2 from './pages/Register2.jsx';
import Register3 from './pages/Register3.jsx';
import Register4 from './pages/Register4.jsx';
import Thankyou from './pages/Thankyou.jsx';
import './assets/css/regform.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
     <AuthProvider>
      <Router basename="">
        <Routes>
          {/* Login route */}
          <Route path="/" element={<Landing />} />
          <Route
              path="loginauthentication"
              element={
                <ProtectedRoute>
                  <Loginauthentication />
                </ProtectedRoute>
              }
            />
          
          {/* Home route with nested protected routes */}
          <Route element={<Home />}>
            
           <Route
              path="register1"
              element={
                <ProtectedRoute>
                  <Register1 />
                </ProtectedRoute>
              }
            />
            <Route
              path="register2"
              element={
                <ProtectedRoute>
                  <Register2 />
                </ProtectedRoute>
              }
            />
            <Route
              path="register3"
              element={
                <ProtectedRoute>
                  <Register3 />
                </ProtectedRoute>
              }
            />
            <Route
              path="register4"
              element={
                <ProtectedRoute>
                  <Register4 />
                </ProtectedRoute>
              }
            />
            <Route
              path="thankyou"
              element={
                <ProtectedRoute>
                  <Thankyou />
                </ProtectedRoute>
              }
            />
            
          </Route> 
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
