// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Camer from './Camera';
import Swap from './Swap';
import Result from './Result';
import LoadingPage from './LoadingPage';
import Error from './Error';
import Admin from './Admin';
import Prompt from './Prompt';
import ResultDisplay from './ResultDisplay';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Camer />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/prompt" element={<Prompt />} />
          <Route path="/result" element={<Result />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/error" element={<Error />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/resultdisplay" element={<ResultDisplay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
