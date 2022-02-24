import React from 'react';

export default function ProgressBar({ step }) {
  const progressBarElements = [];
  const stepData = [
    {
      stepValue: 1,
      desc: 'Products',
    },
    {
      stepValue: 2,
      desc: 'Details',
    },
    {
      stepValue: 3,
      desc: 'Confirm',
    },
    {
      stepValue: 4,
      desc: 'Success',
    },
  ];

  for (let i = 1; i <= step; i++) {
    progressBarElements.push(
      <React.Fragment key={i}>
        <div className="progress-step">
          <h2 className="step-desc">
            {stepData[i - 1].desc}
          </h2>
        </div>

        {i === step
          ? <></>
          : (
            <div className="progress-step">
              <div className="step-dot" />
            </div>
          )}
      </React.Fragment>,
    );
  }

  return (
    <div className="progress-bar flex container">
      {progressBarElements.map((item) => item)}
    </div>
  );
}
