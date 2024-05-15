// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Camer from './Camera';
import Swap from './Swap';
import Result from './Result';
import LoadingPage from './components/LoadingPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Camer />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/result" element={<Result />} />

          <Route path="/loading" element={<LoadingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
