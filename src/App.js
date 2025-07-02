// src/App.js
import React, { useState } from 'react'; // ADD useState here
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectDetail from './components/ProjectDetail';

function App() {
  // FIX 1: Set the basename to match your project folder/deployment path
  const basename = "/my-portfolio";

  // State for active section, passed to Navbar and Home
  const [activeSection, setActiveSection] = useState('home');

  return (
    <Router basename={basename}> {/* FIX 1: Add basename here */}
      {/* FIX 3: Pass activeSection to Navbar */}
      <Navbar activeSection={activeSection} />
      <Routes>
        {/* FIX 3: Pass setActiveSection to Home */}
        <Route path="/" element={<Home setActiveSection={setActiveSection} />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
}

export default App;