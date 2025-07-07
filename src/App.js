// src/App.js
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectDetail from './components/ProjectDetail';

function App() {
  // IMPORTANT: For Netlify root deployment, you MUST remove the 'basename' prop
  // from <Router> and also remove 'homepage' from package.json.
  // The line below should be REMOVED or COMMENTED OUT for Netlify.
  // const basename = "/my-portfolio"; // DELETE OR COMMENT THIS LINE FOR NETLIFY

  const [activeSection, setActiveSection] = useState('home');

  return (
    // If you are deploying to the root of your Netlify URL,
    // the 'basename' prop should NOT be here.
    // It should simply be <Router>
    <Router>
      <Navbar activeSection={activeSection} />
      <Routes>
        <Route path="/" element={<Home setActiveSection={setActiveSection} />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
}

export default App;