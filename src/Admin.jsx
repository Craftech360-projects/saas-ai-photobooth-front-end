import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as Hands from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";

const HandGestureInteractiveLeaves = () => {
  const webcamRef = useRef(null);
  const interactiveCanvasRef = useRef(null); // Canvas for interactive leaves
  const leafImageRef = useRef();
  const leavesRef = useRef([]);
  const animationFrameRef = useRef();
  const timeRef = useRef(0);
  const [isWebcamReady, setIsWebcamReady] = useState(false);

  let mouseX = 0;
  let mouseY = 0;

  const onResults = (results) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks[0]) {
      // Map the first landmark (index finger tip) to mouseX and mouseY
      const landmarks = results.multiHandLandmarks[0];
      mouseX = (1 - landmarks[8].x) * window.innerWidth; // Normalized to canvas width, flipped for mirror effect
      mouseY = landmarks[8].y * window.innerHeight; // Normalized to canvas height
    }
  };

  useEffect(() => {
    const hands = new Hands.Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults(onResults);

    const initializeCamera = () => {
      if (
        webcamRef.current &&
        webcamRef.current.video.readyState === 4
      ) {
        setIsWebcamReady(true);
        const video = webcamRef.current.video;
        video.width = 640;
        video.height = 480;

        const camera = new cam.Camera(video, {
          onFrame: async () => {
            await hands.send({ image: video });
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }
    };

    const interval = setInterval(() => {
      if (webcamRef.current?.video.readyState === 4) {
        initializeCamera();
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const canvas = interactiveCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const leafImage = new Image();
    leafImage.crossOrigin = "anonymous";
    leafImage.src = "assets/cftt.png";
    leafImageRef.current = leafImage;

    const initializeLeaves = () => {
      const leaves = [];
      const baseLeafSize = 60;
      const cols = Math.ceil(window.innerWidth / (baseLeafSize / 2)) + 2;
      const rows = Math.ceil(window.innerHeight / (baseLeafSize / 2)) + 2;

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const posX = x * (baseLeafSize / 2) + Math.random() * 30 - 15;
          const posY = y * (baseLeafSize / 2) + Math.random() * 30 - 15;
          leaves.push({
            x: posX,
            y: posY,
            targetX: posX,
            targetY: posY,
            originalX: posX,
            originalY: posY,
            scale: Math.random() * 1.4 + 0.6,
            speed: Math.random() * 2 + 1,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
          });
        }
      }
      leavesRef.current = leaves;
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const repulsionRadius = 900;

      leavesRef.current.forEach((leaf) => {
        const distToMouse = Math.hypot(mouseX - leaf.x, mouseY - leaf.y);

        if (distToMouse < repulsionRadius) {
          const normalizedDist = 1 - distToMouse / repulsionRadius;
          const repulsionForce = normalizedDist * 60;
          const angle = Math.atan2(leaf.y - mouseY, leaf.x - mouseX);

          leaf.targetX = leaf.originalX + repulsionForce * leaf.speed * Math.cos(angle);
          leaf.targetY = leaf.originalY + repulsionForce * leaf.speed * Math.sin(angle);
        } else {
          const waveX = Math.sin(time * 0.001 + leaf.originalX * 0.01) * 5;
          const waveY = Math.cos(time * 0.002 + leaf.originalY * 0.01) * 5;
          leaf.targetX = leaf.originalX + waveX;
          leaf.targetY = leaf.originalY + waveY;
        }

        leaf.x += (leaf.targetX - leaf.x) * 0.05;
        leaf.y += (leaf.targetY - leaf.y) * 0.05;
        leaf.rotation += leaf.rotationSpeed;

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);

        const leafSize = 50 * leaf.scale;
        ctx.drawImage(
          leafImageRef.current,
          -leafSize / 2,
          -leafSize / 2,
          leafSize,
          leafSize
        );

        ctx.restore();
      });
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeLeaves();
    };

    const animate = (timestamp = 0) => {
      draw(timestamp);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div>
      <Webcam
        ref={webcamRef}
        mirrored
        style={{
          position: "absolute",
          zIndex: -1, // Hide the webcam by setting it behind other elements
          width: "1px",
          height: "1px",
          opacity: 0,
        }}
      />
      <canvas
        ref={interactiveCanvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default HandGestureInteractiveLeaves;