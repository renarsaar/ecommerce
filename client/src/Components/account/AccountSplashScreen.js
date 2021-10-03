import React from 'react';

export default function AccountSplashScreen() {
  return (
    <div className="showcase">
      <img
        src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        alt="vra-ecommerce"
      />

      <h2>
        Photo by
        {' '}
        <a className="orange" href="https://unsplash.com/photos/c9FQyqIECds">
          Unsplash
        </a>
      </h2>
    </div>
  );
}
