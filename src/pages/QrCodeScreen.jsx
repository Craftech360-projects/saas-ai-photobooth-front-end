import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import { FaInstagram } from "react-icons/fa";
import "../styles/QrCodeScreen.css";

const QrCodeScreen = () => {
  const navigate = useNavigate();
  const [swappedImage, setSwappedImage] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    const imageUrl = localStorage.getItem("swappedImageUrl");
    if (!imageUrl) {
      navigate("/result");
      return;
    }
    setSwappedImage(imageUrl);
    setDownloadUrl(`https://example.com/download?id=${Date.now()}`);
  }, [navigate]);

  return (
    <div className="screen third-background">
      <div className="qr-code-container">
        <h2 className="title">Scan the QR code<br/>to download your image</h2>

        <div className="qr-container">
          <QRCode
            value={downloadUrl}
            size={200}
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

        {swappedImage && (
          <div className="result-image-container2">
            <div className="result-wrapper">
              <img
                src={swappedImage}
                alt="Face Swap Result"
                className="result-image"
              />
            </div>
          </div>
        )}

        <button
          className="button next-button"
          onClick={() => navigate("/thank-you")}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default QrCodeScreen;
