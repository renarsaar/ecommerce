import React from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import LogIn from './LogIn';
import Register from './Register';
import Validation from './Validation';

export default function Account({
  login, register, validation, location,
}) {
  return (
    <div className="account">
      <div className="account-container">
        <div className="logo">
          <Link to="/">
            <svg viewBox="0 0 40 80">
              <path d="M38.9811 65.6179L0.972576 79.0502L0.981143 67.4909L38.9896 54.0625M38.9811 65.6179L38.9896 54.0625M38.9811 65.6179L0.989563 52.1291L0.99813 40.5792L19.9939 47.3208L38.9896 54.0625" />
              <path d="M1.01001 26.0827C15.8466 31.3683 24.1649 34.3317 39.0015 39.6173L39.01 28.063C24.1734 22.777 15.8552 19.8133 1.01858 14.5273M1.01001 26.0827L1.01858 14.5273M1.01001 26.0827C15.8533 20.822 24.1753 17.8725 39.0185 12.6117C39.0219 8.08807 39.0238 5.55183 39.0271 1.02817C24.1838 6.29992 15.8618 9.25558 1.01858 14.5273" />
            </svg>
          </Link>
          <h1>Veebirakenduste Arendus</h1>
        </div>

        {login && <LogIn />}
        {register && <Register />}
        {validation && <Validation parsedUrlParams={queryString.parse(location.search)} />}
      </div>

      <div className="showcase">
        <img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="vra-ecommerce" />
        <div />

        <h2>
          Photo by
          {' '}
          <a href="https://unsplash.com/photos/c9FQyqIECds">
            Unsplash
          </a>
        </h2>
      </div>
    </div>
  );
}
