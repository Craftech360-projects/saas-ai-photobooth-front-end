// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Admin from './Admin';
import Camer from './Camera';
import Error from './Error';
import LoadingPage from './LoadingPage';
import Result from './Result';
import Start from './Start';
import Swap from './Swap';

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Start />} />
          <Route path="/start" element={<Camer />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/result" element={<Result />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/error" element={<Error />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
