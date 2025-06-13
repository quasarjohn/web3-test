import React from "react";
import "./Header.css"; // Optional: for styling
import ConnectWalletButton from "../common/ConnectWalletButton/ConnectWalletButton";

export const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
      <ConnectWalletButton className="connect-wallet-btn"></ConnectWalletButton>
    </header>
  );
};
