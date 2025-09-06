import React from "react";
import styles from "./index.module.css"; // CSS module for styling

const ProgressBar = ({ totalSteps, currentStep }) => {
  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressTrack}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          let stepClass = styles.futureStep;

          if (stepNumber === currentStep) {
            stepClass =
              currentStep >= totalSteps - 1
                ? styles.nearFinalStep
                : styles.currentStep;
          } else if (stepNumber < currentStep) {
            stepClass = styles.completedStep;
          }

          return (
            <div
              key={stepNumber}
              className={`${styles.progressStep} ${stepClass}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
