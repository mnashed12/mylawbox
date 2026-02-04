import React, { useState } from 'react';
// Original MyLawBox app saved in MyLawBox.backup.jsx - do not delete!
// import MyLawBox from './MyLawBox';
import Home from './Home';
import Contact from './Contact';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // To restore the original app, uncomment MyLawBox and comment out the return below
  // return <MyLawBox />;
  
  if (currentPage === 'contact') {
    return <Contact onNavigateHome={() => setCurrentPage('home')} />;
  }
  
  return <Home onNavigateContact={() => setCurrentPage('contact')} />;
}

export default App;
