import React, { useState } from 'react';
import MasterKV from '../components/MasterKV.jsx';
import LoginForm from '../components/LoginForm.jsx';
import Footer from '../components/Footer';
import Assistance from '../components/Assistance';
import Intro from '../components/Intro';

function Landing() {

  return (
    <div className='landing-page'>
      <MasterKV/>
      <LoginForm/>
      <Intro/>
      <Assistance/>
      <Footer/>
    </div>
    
  );
}

export default Landing;
