import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add other routes as you develop them */}
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/results" element={<Results />} /> */}
            {/* <Route path="/vision" element={<Vision />} /> */}
            {/* <Route path="/research" element={<Research />} /> */}
            { <Route path="/contact" element={<Contact />} /> }
          </Routes>
        </main>
        <footer className="bg-gray-900 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
            <p>© 2025 CarbonQapture. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;