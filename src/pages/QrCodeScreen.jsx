import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import { FaInstagram, FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import "../styles/QrCodeScreen.css";

const QrCodeScreen = () => {
  const navigate = useNavigate();
  const [swappedImage, setSwappedImage] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const printRef = useRef();

  // Print handler
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Heineken_Avatar",
    onAfterPrint: () => console.log("Printed successfully!"),
  });

  useEffect(() => {
    const imageUrl = localStorage.getItem("swappedImageUrl");
    if (!imageUrl) {
      navigate("/result");
      return;
    }
    setSwappedImage(imageUrl);
    setDownloadUrl(imageUrl);
  }, [navigate]);

  return (
    <div className="screen third-background">
      <div className="qr-code-container">
        <h2 className="title9">
          Scan the QR code to download your image
        </h2>

        <div className="qr-container">
          <QRCode
            value={downloadUrl}
            size={300}
            level="H"
            includeMargin={true}
            renderAs="svg"
            className="qr-code"
          />
        </div>

        <div className="share-container">
          <p className="share-text">
            Share your avatar with your friends and tag
            <span className="instagram-handle">
              @Heineken_in <FaInstagram className="instagram-icon" />
            </span>
          </p>
        </div>

        {/* Printable content */}
        <div ref={printRef} className="print-content">
          <div className="result-image-container2">
            <div className="result-wrapper">
              <img
                src={swappedImage}
                alt="Face Swap Result"
                className="result-image"
              />
            </div>
          </div>
        </div>

        <div className="button-container">
          <button className="button print-button" onClick={handlePrint}>
            Print Image
          </button>
          <button
            className="button next-button"
            onClick={() => navigate("/thank-you")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrCodeScreen;
