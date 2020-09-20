import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showShop, showFabric, showJournal, showAbout } from '../actions';

export default function Header() {
  const dispatch = useDispatch();
  const { shop, fabric, journal, about } = useSelector((state) => state.menu);

  // Handle menu
  const handleShop = () => dispatch(showShop());
  const handleFabric = () => dispatch(showFabric());
  const handleJournal = () => dispatch(showJournal());
  const handleAbout = () => dispatch(showAbout());

  return (
    <div className="header">
      <ul className="header-navbar">
        <a href="https://vra.ee">
          <svg viewBox="0 0 40 80">
            <path d="M38.9811 65.6179L0.972576 79.0502L0.981143 67.4909L38.9896 54.0625M38.9811 65.6179L38.9896 54.0625M38.9811 65.6179L0.989563 52.1291L0.99813 40.5792L19.9939 47.3208L38.9896 54.0625" />
            <path d="M1.01001 26.0827C15.8466 31.3683 24.1649 34.3317 39.0015 39.6173L39.01 28.063C24.1734 22.777 15.8552 19.8133 1.01858 14.5273M1.01001 26.0827L1.01858 14.5273M1.01001 26.0827C15.8533 20.822 24.1753 17.8725 39.0185 12.6117C39.0219 8.08807 39.0238 5.55183 39.0271 1.02817C24.1838 6.29992 15.8618 9.25558 1.01858 14.5273" />
          </svg>
        </a>
        <li className={shop ? 'item active' : 'item'} onClick={handleShop}>
          Shop
        </li>
        <li className={fabric ? 'item active' : 'item'} onClick={handleFabric}>
          Fabric
        </li>
        <li className={journal ? 'item active' : 'item'} onClick={handleJournal}>
          Journal
        </li>
        <li className={about ? 'item active' : 'item'} onClick={handleAbout}>
          About
        </li>
      </ul>

      <div className="header-actions">
        <span>
          <p>
            Account
          </p>
          <i className="lar la-user-circle" />
        </span>
        <i className="las la-search" />
        <i className="lar la-heart" />
        <i className="las la-shopping-bag" />
      </div>
    </div>
  );
}
