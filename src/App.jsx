import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Camer from './Camera'
import Error from './Error'
import LoadingPage from './LoadingPage'
// import Result from './Result'
import Swap from './Swap'
function App() {
  const [count, setCount] = useState(0)
  const backgroundImage = "/background.jpg";
  const camera= "/camera.png";
  return (
    <Router>
    <div
      className="text-center w-screen h-screen"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <Routes>
        <Route path="/" element={<Camer />} />
        {/* <Route path="/1" element={<ThemeSlider />} /> */}
        <Route path="/swap" element={<Swap />} />
        {/* <Route path="/result" element={<Result />} /> */}
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/error" element={<Error />} />

      </Routes>
    </div>
  </Router>
  )
}

export default App
