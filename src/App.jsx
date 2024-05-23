// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Camer from './Camera';
import Swap from './Swap';
import Result from './Result';
import LoadingPage from './components/LoadingPage';
import Error from './Error';
import TabCamer from './TabCamera';
import './index.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/camera" element={<Camer />} />
          <Route path="/" element={<TabCamer />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/result" element={<Result />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
