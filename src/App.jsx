import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Camera from './Camera';
import Swap from './Swap';
import Error from './Error';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Camera />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
