import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch the animation data from the public folder
    fetch('/Falling Shapes.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Could not load Lottie format:", err));

    // Phase 1: Fade out
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    // Phase 2: Unmount from DOM
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 3600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] bg-[#030712] flex items-center justify-center transition-all duration-700 ease-in-out overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0 scale-105 pointer-events-none'
        }`}
    >
      {/* Full Screen Lottie Animation Container */}
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center opacity-90 overflow-hidden mix-blend-screen">
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
            style={{
              width: '100vw',
              height: '100vh',
            }}
          />
        ) : (
          <div className="w-8 h-8 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
