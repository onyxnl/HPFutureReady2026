import { useState } from 'react'
import { Outlet } from "react-router";
import { useEmail } from "../context/AuthContext";  
//import { useAuth } from "../context/AuthContext";
import MasterKV from '../components/MasterKV.jsx';
import Footer from '../components/Footer';
function Home() {

  const { email } = useEmail();
  // const { user } = useAuth();
  return (
    <div className='registerform-wrapper'>
        
      <MasterKV />
        <div className="main"><Outlet context={{email}}/></div> {/* passes email to all nested routes */}
      <Footer/>
    </div>
  )
}

export default Home
