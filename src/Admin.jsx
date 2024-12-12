import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as cam from "@mediapipe/camera_utils";

const HandGestureInteractiveLeaves = () => {
  const webcamRef = useRef(null);
  const interactiveCanvasRef = useRef(null); // Canvas for interactive leaves
  const leafImageRef = useRef([]);
  const leavesRef = useRef([]);
  const animationFrameRef = useRef();
  const [isWebcamReady, setIsWebcamReady] = useState(false);

  let mouseX = 0;
  let mouseY = 0;

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = interactiveCanvasRef.current;
    const ctx = canvas.getContext("2d");

    // List of image paths (can be extended to include more images)
    const leafImagePaths = [
      "assets/flower/1.png",
      "assets/flower/2.png",
      "assets/flower/3.png",
      "assets/flower/4.png", // Add as many images as needed
      "assets/flower/5.png",
      "assets/flower/6.png",
      "assets/flower/7.png",
    ];

    // Load images into a list
    const leafImages = leafImagePaths.map((src) => {
      const img = new Image();
      img.src = src;
      img.crossOrigin = "anonymous"; // Allow cross-origin if necessary
      return img;
    });

    leafImageRef.current = leafImages; // Store the images

    const initializeLeaves = () => {
      const leaves = [];
      const baseLeafSize = 60;
      const cols = Math.ceil(window.innerWidth / (baseLeafSize / 2)) + 2;
      const rows = Math.ceil(window.innerHeight / (baseLeafSize / 2)) + 2;

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const posX = x * (baseLeafSize / 2) + Math.random() * 30 - 15;
          const posY = y * (baseLeafSize / 2) + Math.random() * 30 - 15;

          // Randomly choose an image from the loaded images
          const randomImageIndex = Math.floor(Math.random() * leafImages.length);

          leaves.push({
            x: posX,
            y: posY,
            targetX: posX,
            targetY: posY,
            originalX: posX,
            originalY: posY,
            scale: Math.random() * 1.4 + 0.6,  // Random scaling factor
            speed: Math.random() * 2 + 1,     // Random speed
            rotation: Math.random() * Math.PI * 2, // Random rotation
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            image: leafImages[randomImageIndex], // Assign the random image
          });
        }
      }
      leavesRef.current = leaves;
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const repulsionRadius = 2500;

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
          leaf.image, // Use the randomly selected image
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
