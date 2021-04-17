import React from 'react';

export default function ProgressBar({ stepNumber, stepInfo }) {
  const arr = [];

  for (let i = 1; i <= stepNumber; i++) {
    if (i === stepNumber) {
      arr.push(
        <div key={i} className="bar">
          <h2 className="step-info">
            {stepInfo}
          </h2>
        </div>,
      );
    } else {
      arr.push(<div key={i} className="bar" />);
    }
  }

  return (
    <div className="progress-bar flex container">
      {arr.map((item) => item)}
    </div>
  );
}
