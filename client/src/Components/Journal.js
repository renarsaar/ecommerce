import React from 'react';

export default function Journal() {
  return (
    <div className="journal">
      <div className="journal-article">
        <img
          src="https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
          alt="journal illustration"
        />

        <div className="journal-title">
          <h1 className="mb-3">How to choose the right pair of jeans for your body shape?</h1>

          <div className="line-container">
            <div className="line" />
          </div>

          <button type="button" className="btn">Read More</button>
        </div>
      </div>

      <div className="journal-article">
        <div className="journal-title">
          <h1 className="mb-3">VRA Spring collection</h1>

          <div className="line-container">
            <div className="line" />
          </div>

          <button type="button" className="btn">Read More</button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          alt="Collection illustration"
        />
      </div>
    </div>
  );
}
