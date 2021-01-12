import React from 'react';

export default function ProgressBar({ stepNumber, stepInfo }) {
  const arr = [];

  for (let i = 1; i <= stepNumber; i++) {
    if (i === stepNumber) {
      arr.push(
        <div key={i} className="bar">
          <div className="step-info">
            {stepInfo}
          </div>
        </div>,
      );
    } else {
      arr.push(<div key={i} className="bar" />);
    }
  }

  return (
    <div className="progress-bar">
      {arr.map((item) => item)}
    </div>
  );
}
