import React, { useState, useEffect } from 'react';
import './PageLoadAnimation.css';

const PageLoadAnimation = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState(0);

  useEffect(() => {
    const stages = [
      { duration: 500 },
      { duration: 700 },
      { duration: 800 }
    ];

    let currentStage = 0;
    const stageTimer = setInterval(() => {
      if (currentStage < stages.length) {
        setLoadingStage(currentStage);
        currentStage++;
      } else {
        clearInterval(stageTimer);
        setIsLoading(false);
      }
    }, stages[currentStage]?.duration || 2000);

    return () => clearInterval(stageTimer);
  }, []);

  if (!isLoading) {
    return children;
  }

  return (
    <div className="loading-animation">
      <div className="loading-spinner">
        <div className="spinner-segment segment-1"></div>
        <div className="spinner-segment segment-2"></div>
        <div className="spinner-segment segment-3"></div>
        <div className="spinner-segment segment-4"></div>
      </div>
      <div className="loading-message">
        {[
          'Initializing...',
          'Loading resources...',
          'Preparing interface...'
        ][loadingStage] || 'Loading...'}
      </div>
      <div className="loading-progress-bar">
        <div 
          className="loading-progress" 
          style={{ 
            width: `${(loadingStage + 1) * 33.33}%`,
            transition: 'width 0.5s ease-in-out'
          }}
        ></div>
      </div>
      <div className="loading-percentage">
        {Math.min(Math.round((loadingStage + 1) * 33.33), 100)}%
      </div>
    </div>
  );
};

export default PageLoadAnimation;