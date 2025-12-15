import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing.jsx';
import Loginauthentication from './pages/Loginauthentication.jsx';
import Home from './pages/Home.jsx';
import Register1 from './pages/Register1.jsx';
import Register2 from './pages/Register2.jsx';
import Flight from './pages/Flight.jsx';
import Visa from './pages/Visa.jsx';
import Summary from './pages/Summary.jsx';
import Thankyou from './pages/Thankyou.jsx';
import './assets/css/regform.css'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  
  return (
     <AuthProvider>
      {/* /HP/2026/HP_FutureReady/ */}
      <Router basename="/HP/2026/HP_FutureReady/">
        <Routes>
          {/* Login route */}
          <Route path="/" element={<Landing />} />
          <Route path="loginauthentication" element={<Loginauthentication />} />
          
          {/* Home route with nested protected routes */}
          <Route element={<Home />}>
            <Route path="register1" element={<Register1 />} />
            <Route path="register2" element={<Register2 />} />
            <Route path="register3" element={<Flight />} />
            <Route path="register4" element={<Visa />} />
            <Route path="summary" element={<Summary />} />
            <Route path="thankyou" element={<Thankyou />} />
            
           {/* <Route
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
                  <Flight />
                </ProtectedRoute>
              }
            />
            <Route
              path="register4"
              element={
                <ProtectedRoute>
                  <Visa />
                </ProtectedRoute>
              }
            />
            <Route
              path="summary"
              element={
                <ProtectedRoute>
                  <Summary />
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
            /> */}
            
          </Route> 
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
