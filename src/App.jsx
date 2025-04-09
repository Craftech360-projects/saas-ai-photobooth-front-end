import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import RegistrationScreen from "./pages/RegistrationScreen";
import GenderSelectionScreen from "./pages/GenderSelectionScreen";
import GenderConfirmationScreen from "./pages/GenderConfirmationScreen";
import CharacterSelectionScreen from "./pages/CharacterSelectionScreen";
import CaptureScreen from "./pages/CaptureScreen";
import ProcessingScreen from "./pages/ProcessingScreen";
import ResultScreen from "./pages/ResultScreen";
import QrCodeScreen from "./pages/QrCodeScreen";
import ThankYouScreen from "./pages/ThankYouScreen";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/registration" element={<RegistrationScreen />} />
        <Route path="/gender-selection" element={<GenderSelectionScreen />} />
        <Route
          path="/gender-confirmation"
          element={<GenderConfirmationScreen />}
        />
        <Route
          path="/character-selection"
          element={<CharacterSelectionScreen />}
        />
        <Route path="/capture" element={<CaptureScreen />} />
        <Route path="/processing" element={<ProcessingScreen />} />
        <Route path="/result" element={<ResultScreen />} />
        <Route path="/qr-code" element={<QrCodeScreen />} />
        <Route path="/thank-you" element={<ThankYouScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
