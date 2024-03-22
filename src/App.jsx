import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page1 from './Page1'; // Capture Image Page
import Page2 from './Page2'; // Edit & Swap Page
import Page3 from './Page3'; // Result Page
import Page22 from './page22';
import LoadingPage from './components/LoadingPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/edit" element={<Page2 />} />
          <Route path="/result" element={<Page3 />} />
          <Route path="/loading" element={<LoadingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
