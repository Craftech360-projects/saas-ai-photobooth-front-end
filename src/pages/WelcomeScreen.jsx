import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/WelcomeScreen.css";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Required minimum swipe distance
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;

    if (isLeftSwipe) {
      navigate("/registration");
    }
  };

  // For desktop users, allow clicking to proceed
  const handleClick = () => {
    navigate("/registration");
  };

  return (
    <div
      className="screen welcome-background"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={handleClick}
    >
      <div className="welcome-content">
        <h1 className="title1">
          Strike a pose,
          <br />
          Score a Photo
        </h1>
        <div className="swipe-instruction">
          <p className="subtitle">Swipe to start</p>
          <div className="swipe-arrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
